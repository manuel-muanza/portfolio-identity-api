import { useState } from 'react'

const WELCOME_STORAGE_KEY = 'api-test.welcome-seen'

export function WelcomeModal() {
  const [open, setOpen] = useState(() => localStorage.getItem(WELCOME_STORAGE_KEY) !== 'true')

  function closeModal() {
    localStorage.setItem(WELCOME_STORAGE_KEY, 'true')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="welcome-backdrop">
      <section className="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
        <div className="welcome-visual" aria-hidden="true">
          <span className="welcome-visual-glow" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />
          </svg>
        </div>

        <div className="welcome-content">
          <span className="welcome-eyebrow">Demonstração técnica</span>
          <h1 id="welcome-title">Bem-vindo ao Teste de API</h1>
          <p>
            Este portal foi desenvolvido como uma demonstração prática de competências em engenharia de software,
            arquitetura e integração de sistemas.
          </p>
          <p>
            Os fluxos aqui apresentados foram preparados para facilitar uma avaliação técnica em contextos
            profissionais e possíveis oportunidades de colaboração. Alguns dados são exclusivamente demonstrativos.
          </p>

          <div className="welcome-highlights">
            <span>Arquitetura</span>
            <span>Segurança</span>
            <span>Integrações</span>
            <span>Experiência de API</span>
          </div>

          <button type="button" onClick={closeModal}>
            Explorar demonstração
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <small>Esta mensagem será exibida apenas neste primeiro acesso.</small>
        </div>
      </section>
    </div>
  )
}
