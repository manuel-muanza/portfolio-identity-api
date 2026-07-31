import { useEffect, useRef, useState } from 'react'

const GOOGLE_CLIENT_ID = '9336721402-p72j8nkavb0eidbjtf1vj6a50nqigsa5.apps.googleusercontent.com'
const GOOGLE_SCRIPT_ID = 'google-identity-services'

interface GoogleCredentialResponse {
  credential: string
}

interface GoogleAccountsApi {
  id: {
    initialize: (configuration: {
      client_id: string
      callback: (response: GoogleCredentialResponse) => void
    }) => void
    renderButton: (
      element: HTMLElement,
      configuration: { theme: string; size: string; width: number; text: string; shape: string },
    ) => void
  }
}

declare global {
  interface Window {
    google?: { accounts: GoogleAccountsApi }
  }
}

interface GoogleLoginModalProps {
  open: boolean
  onToken: (token: string) => void
  onClose: () => void
}

export function GoogleLoginModal({ open, onToken, onClose }: GoogleLoginModalProps) {
  const buttonContainer = useRef<HTMLDivElement>(null)
  const [token, setToken] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    let active = true

    const renderGoogleButton = () => {
      if (!active || !window.google || !buttonContainer.current) return
      buttonContainer.current.replaceChildren()
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          setToken(response.credential)
          onToken(response.credential)
        },
      })
      window.google.accounts.id.renderButton(buttonContainer.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        text: 'continue_with',
        shape: 'rectangular',
      })
    }

    if (window.google) {
      queueMicrotask(renderGoogleButton)
    } else {
      let script = document.getElementById(GOOGLE_SCRIPT_ID) as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.id = GOOGLE_SCRIPT_ID
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
      script.addEventListener('load', renderGoogleButton)
    }

    return () => {
      active = false
      document.getElementById(GOOGLE_SCRIPT_ID)?.removeEventListener('load', renderGoogleButton)
    }
  }, [open, onToken])

  async function copyToken() {
    await navigator.clipboard.writeText(token)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  if (!open) return null

  return (
    <div className="google-modal-backdrop">
      <section className="google-modal" role="dialog" aria-modal="true" aria-labelledby="google-login-title">
        <header className="google-modal-header">
          <span className="google-logo" aria-hidden="true">G</span>
          <div>
            <h2 id="google-login-title">Login com Google</h2>
            <p>Obtenha o ID token para testar a autenticação social.</p>
          </div>
          <button type="button" aria-label="Fechar" onClick={onClose}>×</button>
        </header>

        <div className="google-modal-content">
          <p className="google-modal-instruction">
            Entre com uma conta Google. O token recebido será adicionado automaticamente ao body da requisição.
          </p>

          <div className="google-button-container" ref={buttonContainer}>
            <span className="google-button-loading">A carregar login Google...</span>
          </div>

          {token && (
            <div className="google-token-result">
              <div className="google-token-status"><span>✓</span> ID token obtido e adicionado à requisição</div>
              <label htmlFor="google-id-token">ID token</label>
              <textarea id="google-id-token" value={token} readOnly />
              <button type="button" onClick={copyToken}>{copied ? 'Token copiado!' : 'Copiar token'}</button>
            </div>
          )}
        </div>

        <footer className="google-modal-footer">
          <button type="button" disabled={!token} onClick={onClose}>Usar token e continuar</button>
        </footer>
      </section>
    </div>
  )
}
