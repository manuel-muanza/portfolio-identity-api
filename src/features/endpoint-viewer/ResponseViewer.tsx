import type { ApiResult } from '../../shared/types/endpoint'

function colorizeJson(data: unknown) {
  const json = JSON.stringify(data, null, 2) ?? String(data)
  return json.replace(
    /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?)/g,
    (match) => {
      let type = 'number'
      if (/^"/.test(match)) type = /:$/.test(match) ? 'key' : 'string'
      else if (/true|false/.test(match)) type = 'boolean'
      return `<span class="${type}">${match}</span>`
    },
  )
}

function getStatusClass(status: number) {
  if (status === 0) return 'status-connection-error'
  if (status >= 500) return 'status-server-error'
  if (status >= 400) return 'status-client-error'
  if (status >= 300) return 'status-redirect'
  if (status >= 200) return 'status-success'
  return 'status-informational'
}

interface ResponseViewerProps {
  result: ApiResult | null
  loading: boolean
}

export function ResponseViewer({ result, loading }: ResponseViewerProps) {
  const hasResponseContent = result !== null && result.data !== null
  const responseContent = hasResponseContent
    ? JSON.stringify(result.data) ?? String(result.data)
    : ''

  return (
    <section className="panel">
      <div className="response-header">
        <h2>Resposta</h2>
        {loading && <span className="response-loading-label"><span className="loader-dot" /> Processando...</span>}
        {!loading && result && (
          <div className="response-meta">
            <span className={`status ${getStatusClass(result.status)}`}>
              {result.status === 0 ? 'Erro de conexão' : `Status: ${result.status}`}
            </span>
            {result.status !== 0 && <span>{result.duration} ms</span>}
            <span>{new Blob([responseContent]).size} B</span>
          </div>
        )}
      </div>
      {loading ? (
        <div className="response-body response-skeleton" aria-label="Processando resposta" aria-busy="true">
          <span className="skeleton-line skeleton-line-long" />
          <span className="skeleton-line skeleton-line-medium" />
          <span className="skeleton-line skeleton-line-short" />
          <span className="skeleton-line skeleton-line-medium" />
          <span className="skeleton-line skeleton-line-short" />
        </div>
      ) : (
        <pre
          className="response-body"
          dangerouslySetInnerHTML={{ __html: hasResponseContent ? colorizeJson(result.data) : '' }}
        />
      )}
    </section>
  )
}
