import { useState } from 'react'
import { executeRequest } from '../../shared/api/apiClient'
import { getOrCreateDeviceKeys, signDeviceChallenge } from '../../shared/api/deviceCrypto'
import type { ApiResult, Endpoint, KeyValuePair } from '../../shared/types/endpoint'
import { useAuth } from '../authentication/authContext'
import { MfaSetupModal, type MfaSetupData } from '../authentication/MfaSetupModal'
import { EndpointDocumentation } from './EndpointDocumentation'
import { RequestBuilder } from './RequestBuilder'
import { ResponseViewer } from './ResponseViewer'

export function EndpointDetails({ endpoint }: { endpoint: Endpoint }) {
  const {
    token,
    refreshToken,
    sessionId,
    privateKey,
    publicKeyClean,
    challenge,
    deviceId,
    uploadUrl,
    setToken,
    setRefreshToken,
    setSessionId,
    setPrivateKey,
    setPublicKey,
    setPublicKeyClean,
    setChallenge,
    setDeviceId,
    setSignature,
    setUploadUrl,
    setObjectKey,
  } = useAuth()
  const [body, setBody] = useState(endpoint.requestBody ?? '')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<ApiResult | null>(null)
  const [documentationOpen, setDocumentationOpen] = useState(false)
  const [mfaSetup, setMfaSetup] = useState<MfaSetupData | null>(null)
  const [uploadResetVersion, setUploadResetVersion] = useState(0)

  async function handleSend(headers: KeyValuePair[], parameters: KeyValuePair[], binaryBody: Blob | null) {
    setResult(null)
    setSending(true)
    try {
      let activePrivateKey = privateKey
      let activePublicKeyClean = publicKeyClean
      let signature = ''

      if (['login', 'social-login', 'create-account'].includes(endpoint.id)) {
        const identifier = getIdentifierFromBody(body)
        if (identifier) {
          const keys = await getOrCreateDeviceKeys(identifier)
          activePrivateKey = keys.privateKey
          activePublicKeyClean = keys.publicKeyClean
          setPrivateKey(keys.privateKey)
          setPublicKey(keys.publicKey)
          setPublicKeyClean(keys.publicKeyClean)
        }
      }

      if (endpoint.id === 'security-verify-device' && activePrivateKey && challenge) {
        signature = await signDeviceChallenge(activePrivateKey, challenge)
        setSignature(signature)
      }

      const requestBody = endpoint.bodyType === 'binary'
        ? binaryBody
        : endpoint.requestBody === undefined
          ? null
          : body
      const response = await executeRequest(endpoint, requestBody, headers, parameters, {
        token,
        refreshToken,
        verificationToken: sessionId,
        publicKeyClean: activePublicKeyClean,
        deviceId,
        challenge,
        signature,
        uploadUrl,
      })
      setResult(response)

      const receivedVariables = findResponseVariables(response.data)
      if (receivedVariables.accessToken) setToken(receivedVariables.accessToken)
      if (receivedVariables.refreshToken) setRefreshToken(receivedVariables.refreshToken)
      if (receivedVariables.sessionId) setSessionId(receivedVariables.sessionId)
      if (receivedVariables.publicKeyChallenge) setChallenge(receivedVariables.publicKeyChallenge)
      if (receivedVariables.deviceId) setDeviceId(receivedVariables.deviceId)
      if (receivedVariables.uploadUrl) setUploadUrl(receivedVariables.uploadUrl)
      if (receivedVariables.objectKey) setObjectKey(receivedVariables.objectKey)
      if (endpoint.id === 'upload-avatar' && response.status === 200) {
        setUploadResetVersion((version) => version + 1)
      }
      if (endpoint.id === 'start-mfa') {
        const setupData = getMfaSetupData(response.data)
        if (setupData) setMfaSetup(setupData)
      }
    } catch (error) {
      setResult({
        status: 0,
        duration: 0,
        data: {
          error: 'Não foi possível conectar ao serviço de API.',
          message: error instanceof Error ? error.message : 'Erro de conexão desconhecido.',
        },
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="content-wrap">
      <p className="eyebrow">Endpoint selecionado</p>
      <div className="endpoint-heading">
        <span className={`method-badge method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
        <h1>{endpoint.path}</h1>
      </div>
      <p className="endpoint-description">{endpoint.description}</p>
      <RequestBuilder
        key={`${endpoint.id}-${uploadResetVersion}`}
        endpoint={endpoint}
        body={body}
        sending={sending}
        onBodyChange={setBody}
        onSend={handleSend}
        onOpenDocumentation={() => setDocumentationOpen(true)}
      />
      <ResponseViewer result={result} loading={sending} />
      <EndpointDocumentation endpoint={endpoint} open={documentationOpen} onClose={() => setDocumentationOpen(false)} />
      {mfaSetup && <MfaSetupModal data={mfaSetup} onContinue={() => setMfaSetup(null)} />}
    </div>
  )
}

interface ResponseVariables {
  accessToken?: string
  refreshToken?: string
  sessionId?: string
  publicKeyChallenge?: string
  deviceId?: string
  uploadUrl?: string
  objectKey?: string
}

function findResponseVariables(value: unknown, found: ResponseVariables = {}): ResponseVariables {
  if (!value || typeof value !== 'object') return found

  const record = value as Record<string, unknown>
  if (typeof record.accessToken === 'string') found.accessToken = record.accessToken
  if (typeof record.refreshToken === 'string') found.refreshToken = record.refreshToken
  if (typeof record.sessionId === 'string') found.sessionId = record.sessionId
  if (typeof record.publicKeyChallenge === 'string') found.publicKeyChallenge = record.publicKeyChallenge
  if (typeof record.deviceId === 'string') found.deviceId = record.deviceId
  if (typeof record.uploadUrl === 'string') found.uploadUrl = record.uploadUrl
  if (typeof record.objectKey === 'string') found.objectKey = record.objectKey

  for (const nestedValue of Object.values(record)) {
    findResponseVariables(nestedValue, found)
  }
  return found
}

function getIdentifierFromBody(body: string) {
  try {
    const parsedBody = JSON.parse(body) as { identifier?: unknown }
    return typeof parsedBody.identifier === 'string' ? parsedBody.identifier : ''
  } catch {
    return ''
  }
}

function getMfaSetupData(value: unknown): MfaSetupData | null {
  if (!value || typeof value !== 'object') return null
  const record = value as Record<string, unknown>
  if (typeof record.secret === 'string' && typeof record.qrCodeUrl === 'string') {
    return { secret: record.secret, qrCodeUrl: record.qrCodeUrl }
  }
  for (const nestedValue of Object.values(record)) {
    const setupData = getMfaSetupData(nestedValue)
    if (setupData) return setupData
  }
  return null
}
