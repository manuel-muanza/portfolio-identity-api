import type { Endpoint } from '../../shared/types/endpoint'
import { useI18n } from '../../shared/i18n/i18nContext'

interface EndpointDocumentationProps {
  endpoint: Endpoint
  open: boolean
  onClose: () => void
}

export function EndpointDocumentation({ endpoint, open, onClose }: EndpointDocumentationProps) {
  const documentation = endpoint.documentation
  const { tr } = useI18n()

  return (
    <>
      <button
        className={`documentation-backdrop ${open ? 'visible' : ''}`}
        type="button"
        aria-label={tr('Fechar documentação')}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside className={`documentation-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <header className="documentation-drawer-header">
          <span className="documentation-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
            </svg>
          </span>
          <div>
            <strong>{tr('Documentação')}</strong>
            <small>{endpoint.method} {endpoint.path}</small>
          </div>
          <button className="documentation-close" type="button" aria-label={tr('Fechar documentação')} onClick={onClose}>×</button>
        </header>

        <div className="documentation-content">
          {documentation ? (
            <>
              <p>{tr(documentation.overview)}</p>
              {documentation.requirements?.length ? (
                <div className="documentation-section">
                  <h3>{tr('Requisitos')}</h3>
                  <ul>
                    {documentation.requirements.map((requirement) => <li key={requirement}>{tr(requirement)}</li>)}
                  </ul>
                </div>
              ) : null}
              {documentation.steps?.length ? (
                <div className="documentation-section">
                  <h3>{tr('Fluxo recomendado')}</h3>
                  <ol className="documentation-steps">
                    {documentation.steps.map((step) => <li key={step}>{tr(step)}</li>)}
                  </ol>
                </div>
              ) : null}
              {documentation.fields?.length ? (
                <div className="documentation-section">
                  <h3>{tr('Campos da requisição')}</h3>
                  <div className="documentation-fields">
                    {documentation.fields.map((field) => (
                      <div className="documentation-field" key={field.name}>
                        <div>
                          <code>{field.name}</code>
                          <span className="field-type">{field.type}</span>
                          {field.required && <span className="field-required">{tr('obrigatório')}</span>}
                        </div>
                        <p>{tr(field.description)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {documentation.notes?.length ? (
                <div className="documentation-section documentation-notes">
                  <h3>{tr('Observações')}</h3>
                  <ul>
                    {documentation.notes.map((note) => <li key={note}>{tr(note)}</li>)}
                  </ul>
                </div>
              ) : null}
            </>
          ) : (
            <p className="documentation-empty">{tr('A documentação deste endpoint poderá ser adicionada em')} <code>endpointCollections.ts</code>.</p>
          )}
        </div>
      </aside>
    </>
  )
}
