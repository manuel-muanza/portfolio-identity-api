import { endpointCollections } from '../../data/endpointCollections'
import type { Endpoint } from '../types/endpoint'
import { SidebarGroup } from './SidebarGroup'
import { useI18n } from '../i18n/i18nContext'

interface SidebarProps {
  selectedId: string
  open: boolean
  onClose: () => void
  onSelect: (endpoint: Endpoint) => void
}

export function Sidebar({ selectedId, open, onClose, onSelect }: SidebarProps) {
  const { tr } = useI18n()
  return (
    <>
      <button
        className={`sidebar-backdrop ${open ? 'visible' : ''}`}
        type="button"
        aria-label={tr('Fechar menu lateral')}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
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
    </>
  )
}
