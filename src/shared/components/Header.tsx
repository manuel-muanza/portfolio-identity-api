import { useState } from 'react'
import { ArchitecturePanel } from './ArchitecturePanel'

interface HeaderProps {
  onMenuToggle: () => void
  menuOpen: boolean
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const [architectureOpen, setArchitectureOpen] = useState(false)

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button
            className="icon-button mobile-menu"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={onMenuToggle}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
          <div className="brand">
            Teste de API
          </div>
        </div>
        <div className="header-actions">
          <button className="architecture-menu-button" type="button" onClick={() => setArchitectureOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="8.5" y="14" width="7" height="7" rx="1" />
              <path d="M6.5 10v2h11v-2M12 12v2" />
            </svg>
            Arquitetura e práticas
          </button>
          <div className="environment"><span className="environment-dot" /> Sandbox</div>
        </div>
      </header>
      <ArchitecturePanel open={architectureOpen} onClose={() => setArchitectureOpen(false)} />
    </>
  )
}
