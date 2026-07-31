import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export interface MfaSetupData {
  secret: string
  qrCodeUrl: string
}

interface MfaSetupModalProps {
  data: MfaSetupData
  onContinue: () => void
}

export function MfaSetupModal({ data, onContinue }: MfaSetupModalProps) {
  const [qrImage, setQrImage] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true
    QRCode.toDataURL(data.qrCodeUrl, {
      width: 220,
      margin: 2,
      color: { dark: '#111a2e', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    }).then((image) => {
      if (active) setQrImage(image)
    })
    return () => {
      active = false
    }
  }, [data.qrCodeUrl])

  async function copySecret() {
    await navigator.clipboard.writeText(data.secret)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="mfa-modal-backdrop" role="presentation">
      <section className="mfa-modal" role="dialog" aria-modal="true" aria-labelledby="mfa-modal-title">
        <div className="mfa-modal-header">
          <span className="mfa-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <div>
            <h2 id="mfa-modal-title">Configure o seu autenticador</h2>
            <p>Adicione uma nova conta TOTP para proteger o seu acesso.</p>
          </div>
        </div>

        <div className="mfa-modal-content">
          <ol className="mfa-instructions">
            <li>Abra a sua aplicação autenticadora.</li>
            <li>Escolha adicionar uma conta e leia o QR Code.</li>
            <li>Se necessário, use a chave manual apresentada abaixo.</li>
          </ol>

          <div className="mfa-qr">
            {qrImage ? <img src={qrImage} alt="QR Code para configurar MFA" /> : <span className="mfa-qr-loader" />}
          </div>

          <label className="mfa-secret-label" htmlFor="mfa-secret">Chave de configuração</label>
          <div className="mfa-secret-row">
            <input id="mfa-secret" value={data.secret} readOnly />
            <button type="button" onClick={copySecret}>{copied ? 'Copiado!' : 'Copiar'}</button>
          </div>

          <p className="mfa-warning">Não compartilhe esta chave. Ela permite gerar os códigos da sua conta.</p>
        </div>

        <div className="mfa-modal-footer">
          <button type="button" onClick={onContinue}>Continuar</button>
        </div>
      </section>
    </div>
  )
}
