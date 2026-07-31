export interface DeviceKeys {
  privateKey: string
  publicKey: string
  publicKeyClean: string
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return window.btoa(binary)
}

function base64ToArrayBuffer(value: string) {
  const binary = window.atob(value)
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
  return bytes.buffer
}

function toPem(base64: string, label: 'PUBLIC KEY' | 'PRIVATE KEY') {
  const lines = base64.match(/.{1,64}/g)?.join('\n') ?? base64
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`
}

export async function getOrCreateDeviceKeys(identifier: string): Promise<DeviceKeys> {
  const normalizedIdentifier = identifier.trim().toLowerCase().split('@')[0]
  const storagePrefix = `api-test.keys.${normalizedIdentifier}`
  const storedPrivateKey = localStorage.getItem(`${storagePrefix}.private`)
  const storedPublicKey = localStorage.getItem(`${storagePrefix}.public`)

  if (storedPrivateKey && storedPublicKey) {
    return {
      privateKey: storedPrivateKey,
      publicKey: toPem(storedPublicKey, 'PUBLIC KEY'),
      publicKeyClean: storedPublicKey,
    }
  }

  const keyPair = await crypto.subtle.generateKey(
    { name: 'Ed25519' },
    true,
    ['sign', 'verify'],
  )
  const privateKey = arrayBufferToBase64(await crypto.subtle.exportKey('pkcs8', keyPair.privateKey))
  const publicKeyClean = arrayBufferToBase64(await crypto.subtle.exportKey('spki', keyPair.publicKey))

  localStorage.setItem(`${storagePrefix}.private`, privateKey)
  localStorage.setItem(`${storagePrefix}.public`, publicKeyClean)

  return {
    privateKey,
    publicKey: toPem(publicKeyClean, 'PUBLIC KEY'),
    publicKeyClean,
  }
}

export async function signDeviceChallenge(privateKey: string, challenge: string) {
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    base64ToArrayBuffer(privateKey),
    { name: 'Ed25519' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign(
    { name: 'Ed25519' },
    cryptoKey,
    new TextEncoder().encode(challenge),
  )
  return arrayBufferToBase64(signature)
}
