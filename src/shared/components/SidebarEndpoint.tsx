import type { Endpoint } from '../types/endpoint'

interface SidebarEndpointProps {
  endpoint: Endpoint
  active: boolean
  onSelect: (endpoint: Endpoint) => void
}

export function SidebarEndpoint({ endpoint, active, onSelect }: SidebarEndpointProps) {
  return (
    <button
      className={`sidebar-endpoint ${active ? 'active' : ''}`}
      type="button"
      onClick={() => onSelect(endpoint)}
    >
      <span className={`method method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
      <span>{endpoint.name}</span>
    </button>
  )
}
