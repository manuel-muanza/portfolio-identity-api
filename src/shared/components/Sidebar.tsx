import { endpointCollections } from '../../data/endpointCollections'
import type { Endpoint } from '../types/endpoint'
import { SidebarGroup } from './SidebarGroup'

interface SidebarProps {
  selectedId: string
  open: boolean
  onSelect: (endpoint: Endpoint) => void
}

export function Sidebar({ selectedId, open, onSelect }: SidebarProps) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <p className="sidebar-label">API Reference</p>
      {endpointCollections.map((collection) => (
        <SidebarGroup
          key={collection.id}
          collection={collection}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </aside>
  )
}
