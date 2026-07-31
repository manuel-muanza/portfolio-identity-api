import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './authContext'

function useSessionValue(key: string) {
  const [value, setValue] = useState(() => sessionStorage.getItem(key) ?? '')

  useEffect(() => {
    if (value) {
      sessionStorage.setItem(key, value)
    } else {
      sessionStorage.removeItem(key)
    }
  }, [key, value])

  return [value, setValue] as const
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useSessionValue('api-test.token')
  const [refreshToken, setRefreshToken] = useSessionValue('api-test.refreshToken')
  const [sessionId, setSessionId] = useSessionValue('api-test.sessionId')
  const [privateKey, setPrivateKey] = useSessionValue('api-test.privateKey')
  const [publicKey, setPublicKey] = useSessionValue('api-test.publicKey')
  const [publicKeyClean, setPublicKeyClean] = useSessionValue('api-test.publicKeyClean')
  const [challenge, setChallenge] = useSessionValue('api-test.challenge')
  const [deviceId, setDeviceId] = useSessionValue('api-test.deviceId')
  const [signature, setSignature] = useSessionValue('api-test.signature')
  const [uploadUrl, setUploadUrl] = useSessionValue('api-test.uploadUrl')
  const [objectKey, setObjectKey] = useSessionValue('api-test.objectKey')
  const [resetToken, setResetToken] = useSessionValue('api-test.resetToken')
  const value = useMemo(
    () => ({
      token,
      setToken,
      refreshToken,
      setRefreshToken,
      sessionId,
      setSessionId,
      privateKey,
      setPrivateKey,
      publicKey,
      setPublicKey,
      publicKeyClean,
      setPublicKeyClean,
      challenge,
      setChallenge,
      deviceId,
      setDeviceId,
      signature,
      setSignature,
      uploadUrl,
      setUploadUrl,
      objectKey,
      setObjectKey,
      resetToken,
      setResetToken,
      authenticated: token.trim().length > 0,
    }),
    [
      token,
      setToken,
      refreshToken,
      setRefreshToken,
      sessionId,
      setSessionId,
      privateKey,
      setPrivateKey,
      publicKey,
      setPublicKey,
      publicKeyClean,
      setPublicKeyClean,
      challenge,
      setChallenge,
      deviceId,
      setDeviceId,
      signature,
      setSignature,
      uploadUrl,
      setUploadUrl,
      objectKey,
      setObjectKey,
      resetToken,
      setResetToken,
    ],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
