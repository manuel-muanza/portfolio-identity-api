import { useState } from 'react'
import type { Endpoint, EndpointCollection, EndpointGroup } from '../types/endpoint'
import { SidebarEndpoint } from './SidebarEndpoint'
import { useI18n } from '../i18n/i18nContext'

interface SidebarGroupProps {
  collection: EndpointCollection
  selectedId: string
  onSelect: (endpoint: Endpoint) => void
}

function CollectionIcon({ type }: { type: EndpointCollection['icon'] }) {
  if (type === 'preferences') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06-2.83 2.83-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21h-4v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06-2.83-2.83.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3v-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06 2.83-2.83.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3h4v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06 2.83 2.83-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21v4h-.09A1.65 1.65 0 0 0 19.4 15Z" /></svg>
  }
  if (type === 'users') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  }
  if (type === 'devices') {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 18h6" /></svg>
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
}

export function SidebarGroup({ collection, selectedId, onSelect }: SidebarGroupProps) {
  const [open, setOpen] = useState(true)
  const { tr } = useI18n()

  return (
    <section className="sidebar-group">
      <button className="sidebar-group-button" type="button" onClick={() => setOpen((value) => !value)}>
        <span className="group-icon"><CollectionIcon type={collection.icon} /></span>
        {tr(collection.name)}
        <span className={`chevron ${open ? '' : 'closed'}`}>⌄</span>
      </button>
      {open && (
        <div className="sidebar-endpoints">
          {collection.endpoints.map((endpoint) => (
            <SidebarEndpoint
              key={endpoint.id}
              endpoint={endpoint}
              active={endpoint.id === selectedId}
              onSelect={onSelect}
            />
          ))}
          {collection.groups?.map((group) => (
            <SidebarSubgroup
              key={group.id}
              group={group}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function SidebarSubgroup({
  group,
  selectedId,
  onSelect,
}: {
  group: EndpointGroup
  selectedId: string
  onSelect: (endpoint: Endpoint) => void
}) {
  const [open, setOpen] = useState(true)
  const { tr } = useI18n()

  return (
    <div className="sidebar-subgroup">
      <button className="sidebar-subgroup-button" type="button" onClick={() => setOpen((value) => !value)}>
        <span className="subgroup-folder" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h6l2 2h10v10H3Z" />
          </svg>
        </span>
        {tr(group.name)}
        <span className={`chevron ${open ? '' : 'closed'}`}>⌄</span>
      </button>
      {open && (
        <div className="sidebar-subgroup-endpoints">
          {group.endpoints.map((endpoint) => (
            <SidebarEndpoint
              key={endpoint.id}
              endpoint={endpoint}
              active={endpoint.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
