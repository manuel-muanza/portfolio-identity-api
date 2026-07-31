import { createContext, useContext } from 'react'

export interface AuthContextValue {
  token: string
  setToken: (token: string) => void
  refreshToken: string
  setRefreshToken: (refreshToken: string) => void
  sessionId: string
  setSessionId: (sessionId: string) => void
  privateKey: string
  setPrivateKey: (privateKey: string) => void
  publicKey: string
  setPublicKey: (publicKey: string) => void
  publicKeyClean: string
  setPublicKeyClean: (publicKeyClean: string) => void
  challenge: string
  setChallenge: (challenge: string) => void
  deviceId: string
  setDeviceId: (deviceId: string) => void
  signature: string
  setSignature: (signature: string) => void
  uploadUrl: string
  setUploadUrl: (uploadUrl: string) => void
  objectKey: string
  setObjectKey: (objectKey: string) => void
  resetToken: string
  setResetToken: (resetToken: string) => void
  authenticated: boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
