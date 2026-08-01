import type { Endpoint } from '../types/endpoint'
import { useI18n } from '../i18n/i18nContext'

interface SidebarEndpointProps {
  endpoint: Endpoint
  active: boolean
  onSelect: (endpoint: Endpoint) => void
}

export function SidebarEndpoint({ endpoint, active, onSelect }: SidebarEndpointProps) {
  const { tr } = useI18n()
  return (
    <button
      className={`sidebar-endpoint ${active ? 'active' : ''}`}
      type="button"
      onClick={() => onSelect(endpoint)}
    >
      <span className={`method method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
      <span>{tr(endpoint.name)}</span>
    </button>
  )
}
