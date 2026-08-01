import { useState } from 'react'
import { executeRequest } from '../../shared/api/apiClient'
import { getOrCreateDeviceKeys, signDeviceChallenge } from '../../shared/api/deviceCrypto'
import type { ApiResult, Endpoint, KeyValuePair } from '../../shared/types/endpoint'
import { useAuth } from '../authentication/authContext'
import { MfaSetupModal, type MfaSetupData } from '../authentication/MfaSetupModal'
import { GoogleLoginModal } from '../authentication/GoogleLoginModal'
import { EndpointDocumentation } from './EndpointDocumentation'
import { RequestBuilder } from './RequestBuilder'
import { ResponseViewer } from './ResponseViewer'
import { useI18n } from '../../shared/i18n/i18nContext'

export function EndpointDetails({ endpoint }: { endpoint: Endpoint }) {
  const { tr } = useI18n()
  const {
    token,
    refreshToken,
    sessionId,
    privateKey,
    publicKeyClean,
    challenge,
    deviceId,
    uploadUrl,
    resetToken,
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
    setResetToken,
  } = useAuth()
  const [body, setBody] = useState(endpoint.requestBody ?? '')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<ApiResult | null>(null)
  const [documentationOpen, setDocumentationOpen] = useState(false)
  const [mfaSetup, setMfaSetup] = useState<MfaSetupData | null>(null)
  const [uploadResetVersion, setUploadResetVersion] = useState(0)
  const usesGoogleLogin = ['validate-social-login', 'create-account-google'].includes(endpoint.id)
  const [googleLoginOpen, setGoogleLoginOpen] = useState(usesGoogleLogin)

  async function handleSend(headers: KeyValuePair[], parameters: KeyValuePair[], binaryBody: Blob | null) {
    setResult(null)
    setSending(true)
    try {
      let activePrivateKey = privateKey
      let activePublicKeyClean = publicKeyClean
      let signature = ''

      if (['login', 'create-account'].includes(endpoint.id)) {
        const identifier = getIdentifierFromBody(body)
        if (identifier) {
          const mustRotateKeys = endpoint.id === 'login'
            && sessionStorage.getItem('api-test.rotateDeviceKeys') === 'true'
          const keys = await getOrCreateDeviceKeys(identifier, mustRotateKeys)
          if (mustRotateKeys) sessionStorage.removeItem('api-test.rotateDeviceKeys')
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
      const latestToken = sessionStorage.getItem('api-test.token') ?? token
      const latestRefreshToken = sessionStorage.getItem('api-test.refreshToken') ?? refreshToken
      const response = await executeRequest(endpoint, requestBody, headers, parameters, {
        token: latestToken,
        refreshToken: latestRefreshToken,
        verificationToken: sessionId,
        publicKeyClean: activePublicKeyClean,
        deviceId,
        challenge,
        signature,
        uploadUrl,
        resetToken,
      })
      setResult(response)

      const receivedVariables = findResponseVariables(response.data)
      if (receivedVariables.accessToken) {
        sessionStorage.setItem('api-test.token', receivedVariables.accessToken)
        setToken(receivedVariables.accessToken)
      }
      if (receivedVariables.refreshToken) {
        sessionStorage.setItem('api-test.refreshToken', receivedVariables.refreshToken)
        setRefreshToken(receivedVariables.refreshToken)
      }
      if (receivedVariables.sessionId) setSessionId(receivedVariables.sessionId)
      if (receivedVariables.publicKeyChallenge) setChallenge(receivedVariables.publicKeyChallenge)
      if (receivedVariables.publicKeyChallengeWasNull) {
        setChallenge('')
        setSignature('')
        sessionStorage.removeItem('api-test.challenge')
        sessionStorage.removeItem('api-test.signature')
        if (endpoint.id === 'login' && isTrustedDeviceLogin(body)) {
          sessionStorage.setItem('api-test.rotateDeviceKeys', 'true')
        }
      }
      if (receivedVariables.deviceId) setDeviceId(receivedVariables.deviceId)
      if (receivedVariables.uploadUrl) setUploadUrl(receivedVariables.uploadUrl)
      if (receivedVariables.objectKey) setObjectKey(receivedVariables.objectKey)
      const receivedResetToken = receivedVariables.resetToken
        ?? getResetTokenFromLink(receivedVariables.resetLink)
      if (receivedResetToken) {
        sessionStorage.setItem('api-test.resetToken', receivedResetToken)
        setResetToken(receivedResetToken)
      }
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
          error: tr('Não foi possível conectar ao serviço de API.'),
          message: error instanceof Error ? error.message : tr('Erro de conexão desconhecido.'),
        },
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="content-wrap">
      <p className="eyebrow">{tr('Endpoint selecionado')}</p>
      <div className="endpoint-heading">
        <span className={`method-badge method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
        <h1>{endpoint.path}</h1>
      </div>
      <p className="endpoint-description">{tr(endpoint.description)}</p>
      {usesGoogleLogin && (
        <button className="open-google-login" type="button" onClick={() => setGoogleLoginOpen(true)}>
          <span>G</span> {tr('Obter ID token do Google')}
        </button>
      )}
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
      <GoogleLoginModal
        open={googleLoginOpen}
        onClose={() => setGoogleLoginOpen(false)}
        onToken={(idToken) => setBody(JSON.stringify({ idToken }, null, 2))}
      />
    </div>
  )
}

interface ResponseVariables {
  accessToken?: string
  refreshToken?: string
  sessionId?: string
  publicKeyChallenge?: string
  publicKeyChallengeWasNull?: boolean
  deviceId?: string
  uploadUrl?: string
  objectKey?: string
  resetToken?: string
  resetLink?: string
}

function findResponseVariables(value: unknown, found: ResponseVariables = {}): ResponseVariables {
  if (!value || typeof value !== 'object') return found

  const record = value as Record<string, unknown>
  if (typeof record.accessToken === 'string') found.accessToken = record.accessToken
  if (typeof record.refreshToken === 'string') found.refreshToken = record.refreshToken
  if (typeof record.sessionId === 'string') found.sessionId = record.sessionId
  if (typeof record.publicKeyChallenge === 'string') found.publicKeyChallenge = record.publicKeyChallenge
  if (Object.hasOwn(record, 'publicKeyChallenge') && record.publicKeyChallenge === null) {
    found.publicKeyChallengeWasNull = true
  }
  if (typeof record.deviceId === 'string') found.deviceId = record.deviceId
  if (typeof record.uploadUrl === 'string') found.uploadUrl = record.uploadUrl
  if (typeof record.objectKey === 'string') found.objectKey = record.objectKey
  if (typeof record.resetToken === 'string') found.resetToken = record.resetToken
  if (typeof record.resetLink === 'string') found.resetLink = record.resetLink

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

function isTrustedDeviceLogin(body: string) {
  try {
    const parsedBody = JSON.parse(body) as { trustThisDevice?: unknown }
    return parsedBody.trustThisDevice === true
  } catch {
    return false
  }
}

function getResetTokenFromLink(resetLink?: string) {
  if (!resetLink) return undefined
  try {
    return new URL(resetLink, window.location.origin).searchParams.get('token') ?? undefined
  } catch {
    return resetLink.match(/[?&]token=([^&]+)/)?.[1]
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
