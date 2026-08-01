import { useState } from 'react'
import type { Endpoint, KeyValuePair } from '../../shared/types/endpoint'
import { useAuth } from '../authentication/authContext'
import { BodyEditor } from './BodyEditor'
import { HeadersEditor } from './HeadersEditor'
import { ImageUploadEditor } from './ImageUploadEditor'
import { VariablesEditor } from './VariablesEditor'
import { useI18n } from '../../shared/i18n/i18nContext'

type Tab = 'params' | 'headers' | 'body'

interface RequestBuilderProps {
  endpoint: Endpoint
  body: string
  sending: boolean
  onBodyChange: (body: string) => void
  onSend: (headers: KeyValuePair[], parameters: KeyValuePair[], binaryBody: Blob | null) => void
  onOpenDocumentation: () => void
}

export function RequestBuilder({ endpoint, body, sending, onBodyChange, onSend, onOpenDocumentation }: RequestBuilderProps) {
  const { sessionId, deviceId, uploadUrl, resetToken } = useAuth()
  const { tr } = useI18n()
  const hasBody = endpoint.requestBody !== undefined || endpoint.bodyType === 'binary'
  const [tab, setTab] = useState<Tab>(hasBody ? 'body' : 'params')
  const [headers, setHeaders] = useState<KeyValuePair[]>([
    ...(hasBody
      ? [{ id: 'content-type', key: 'Content-Type', value: endpoint.bodyType === 'binary' ? 'image/png' : 'application/json' }]
      : []),
    ...(['login', 'refresh-token', 'validate-social-login', 'create-account', 'create-account-google', 'send-verification-code', 'verify-verification-code', 'upload-avatar', 'request-password-reset', 'validate-password-reset', 'complete-password-reset'].includes(endpoint.id)
      ? []
      : [{ id: 'authorization', key: 'Authorization', value: 'Bearer {{token}}' }]),
  ])
  const [variables, setVariables] = useState<KeyValuePair[]>([])
  const [binaryBody, setBinaryBody] = useState<Blob | null>(null)
  const visiblePath = sessionId
    ? endpoint.path.replaceAll('{{verificationToken}}', sessionId)
    : endpoint.path
  const resolvedVisiblePath = deviceId
    ? visiblePath.replaceAll('{{deviceId}}', deviceId)
    : visiblePath
  const resolvedTokenPath = resetToken
    ? resolvedVisiblePath.replaceAll('{{resetToken}}', resetToken)
    : resolvedVisiblePath
  const requestUrl = endpoint.path === '{{uploadUrl}}' && uploadUrl
    ? uploadUrl
    : `${import.meta.env.VITE_API_BASE_URL}${resolvedTokenPath}`

  return (
    <>
      <div className="request-url">
        <div className="url-field">
          <code>{requestUrl}</code>
        </div>
        <button
          className="send-button"
          type="button"
          onClick={() => onSend(headers, variables, binaryBody)}
          disabled={sending || (endpoint.bodyType === 'binary' && binaryBody === null)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
          {sending ? tr('A enviar...') : tr('Enviar requisição')}
        </button>
      </div>
      <section className="panel">
        <div className="tabs">
          <button className={`tab ${tab === 'params' ? 'active' : ''}`} type="button" onClick={() => setTab('params')}>Params</button>
          <button className={`tab ${tab === 'headers' ? 'active' : ''}`} type="button" onClick={() => setTab('headers')}>Headers <span className="tab-count">{headers.length}</span></button>
          <button className={`tab ${tab === 'body' ? 'active' : ''}`} type="button" onClick={() => setTab('body')}>Body</button>
          <button className="documentation-tab" type="button" onClick={onOpenDocumentation}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            </svg>
            {tr('Documentação')}
          </button>
        </div>
        {tab === 'params' && <VariablesEditor variables={variables} onChange={setVariables} />}
        {tab === 'headers' && <HeadersEditor headers={headers} onChange={setHeaders} />}
        {tab === 'body' && (
          endpoint.bodyType === 'binary'
            ? <ImageUploadEditor onConfirm={(image, contentType) => {
                setBinaryBody(image)
                setHeaders((currentHeaders) => currentHeaders.map((header) =>
                  header.id === 'content-type' ? { ...header, value: contentType } : header,
                ))
              }} />
            : endpoint.requestBody
              ? <BodyEditor body={body} onChange={onBodyChange} />
              : <div className="editor empty-editor">{tr('Esta requisição não possui body.')}</div>
        )}
      </section>
    </>
  )
}
