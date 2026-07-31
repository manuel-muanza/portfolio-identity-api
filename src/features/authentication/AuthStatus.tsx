import { useAuth } from './authContext'

export function AuthStatus({ compact = false }: { compact?: boolean }) {
  const { authenticated, token, setToken } = useAuth()

  if (compact) {
    return <div className="avatar" title={authenticated ? 'Autenticado' : 'Não autenticado'}>AM</div>
  }

  return (
    <div className="auth-card">
      <div className="auth-status">
        <span>Autorização Bearer</span>
        <strong>{authenticated ? '● Autenticado' : '○ Sem token'}</strong>
      </div>
      <input
        className="token-input"
        value={token}
        onChange={(event) => setToken(event.target.value)}
        aria-label="Bearer token"
        placeholder="Cole seu access token"
      />
    </div>
  )
}
