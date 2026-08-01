import { useState } from 'react'
import { endpointCollections } from '../data/endpointCollections'
import { EndpointDetails } from '../features/endpoint-viewer/EndpointDetails'
import { MainLayout } from '../shared/components/MainLayout'
import type { Endpoint } from '../shared/types/endpoint'
import { useI18n } from '../shared/i18n/i18nContext'

export function DeveloperPortalPage() {
  const { tr } = useI18n()
  const initialEndpoint = endpointCollections[0].endpoints[0]
  const [openEndpoints, setOpenEndpoints] = useState<Endpoint[]>([initialEndpoint])
  const [activeEndpointId, setActiveEndpointId] = useState(initialEndpoint.id)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const selectedEndpoint = openEndpoints.find((endpoint) => endpoint.id === activeEndpointId) ?? openEndpoints[0]

  function handleSelect(endpoint: Endpoint) {
    setOpenEndpoints((currentEndpoints) =>
      currentEndpoints.some((currentEndpoint) => currentEndpoint.id === endpoint.id)
        ? currentEndpoints
        : [...currentEndpoints, endpoint],
    )
    setActiveEndpointId(endpoint.id)
    setSidebarOpen(false)
  }

  function closeEndpoint(endpointId: string) {
    if (openEndpoints.length === 1) return

    const closingIndex = openEndpoints.findIndex((endpoint) => endpoint.id === endpointId)
    const remainingEndpoints = openEndpoints.filter((endpoint) => endpoint.id !== endpointId)
    setOpenEndpoints(remainingEndpoints)

    if (activeEndpointId === endpointId) {
      const nextEndpoint = remainingEndpoints[Math.min(closingIndex, remainingEndpoints.length - 1)]
      setActiveEndpointId(nextEndpoint.id)
    }
  }

  return (
    <MainLayout
      selectedId={selectedEndpoint.id}
      sidebarOpen={sidebarOpen}
      onMenuToggle={() => setSidebarOpen((value) => !value)}
      onSelect={handleSelect}
    >
      <div className="endpoint-tabs" role="tablist" aria-label={tr('Requisições abertas')}>
        {openEndpoints.map((endpoint) => (
          <div className={`endpoint-tab ${endpoint.id === activeEndpointId ? 'active' : ''}`} key={endpoint.id}>
            <button
              className="endpoint-tab-select"
              type="button"
              role="tab"
              aria-selected={endpoint.id === activeEndpointId}
              onClick={() => setActiveEndpointId(endpoint.id)}
            >
              <span className={`method method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
              <span>{tr(endpoint.name)}</span>
            </button>
            {openEndpoints.length > 1 && (
              <button
                className="endpoint-tab-close"
                type="button"
                aria-label={`${tr('Fechar')} ${tr(endpoint.name)}`}
                onClick={() => closeEndpoint(endpoint.id)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {openEndpoints.map((endpoint) => (
        <div
          className={`endpoint-tab-panel ${endpoint.id === activeEndpointId ? 'active' : ''}`}
          key={endpoint.id}
          role="tabpanel"
        >
          <EndpointDetails endpoint={endpoint} />
        </div>
      ))}
    </MainLayout>
  )
}
