import { useState } from 'react'
import { ArchitecturePanel } from './ArchitecturePanel'
import { useI18n } from '../i18n/i18nContext'

interface HeaderProps {
  onMenuToggle: () => void
  menuOpen: boolean
}

export function Header({ onMenuToggle, menuOpen }: HeaderProps) {
  const [architectureOpen, setArchitectureOpen] = useState(false)
  const { language, setLanguage, tr } = useI18n()

  return (
    <>
      <header className="header">
        <div className="header-left">
          <button
            className="icon-button mobile-menu"
            type="button"
            aria-label={tr(menuOpen ? 'Fechar menu' : 'Abrir menu')}
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
            {tr('Teste de API')}
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
            {tr('Arquitetura e práticas')}
          </button>
          <div className="language-switcher" role="group" aria-label={tr('Selecionar idioma')}>
            <button
              className={language === 'pt' ? 'active' : ''}
              type="button"
              aria-pressed={language === 'pt'}
              onClick={() => setLanguage('pt')}
            >
              <span className="language-code">PT</span>
              <span className="language-name">Português</span>
            </button>
            <button
              className={language === 'en' ? 'active' : ''}
              type="button"
              aria-pressed={language === 'en'}
              onClick={() => setLanguage('en')}
            >
              <span className="language-code">EN</span>
              <span className="language-name">English</span>
            </button>
          </div>
          <div className="environment"><span className="environment-dot" /> Sandbox</div>
        </div>
      </header>
      <ArchitecturePanel open={architectureOpen} onClose={() => setArchitectureOpen(false)} />
    </>
  )
}
