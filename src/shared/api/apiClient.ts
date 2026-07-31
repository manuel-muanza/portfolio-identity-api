import type { ApiResult, Endpoint, KeyValuePair } from '../types/endpoint'

export async function executeRequest(
  endpoint: Endpoint,
  body: string | Blob | null,
  requestHeaders: KeyValuePair[],
  parameters: KeyValuePair[],
  variables: {
    token: string
    refreshToken: string
    verificationToken: string
    publicKeyClean: string
    deviceId: string
    challenge: string
    signature: string
    uploadUrl: string
  },
): Promise<ApiResult> {
  const startedAt = performance.now()
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const resolveVariables = (value: string) =>
    value
      .replaceAll('{{token}}', variables.token)
      .replaceAll('{{refreshToken}}', variables.refreshToken)
      .replaceAll('{{verificationToken}}', variables.verificationToken)
      .replaceAll('{{public_key_clean}}', variables.publicKeyClean)
      .replaceAll('{{deviceId}}', variables.deviceId)
      .replaceAll('{{challenge}}', variables.challenge)
      .replaceAll('{{signature}}', variables.signature)
      .replaceAll('{{uploadUrl}}', variables.uploadUrl)
  const resolvedPath = resolveVariables(endpoint.path)
  const url = new URL(/^https?:\/\//i.test(resolvedPath) ? resolvedPath : `${baseUrl}${resolvedPath}`)

  parameters.forEach((parameter) => {
    url.searchParams.append(resolveVariables(parameter.key), resolveVariables(parameter.value))
  })

  const headers = new Headers()
  requestHeaders.forEach((header) => {
    headers.append(resolveVariables(header.key), resolveVariables(header.value))
  })

  const requestUrl = endpoint.id === 'upload-avatar' && import.meta.env.DEV
    ? `/__s3_upload${url.pathname}${url.search}`
    : url

  const response = await fetch(requestUrl, {
    method: endpoint.method,
    headers,
    body: endpoint.method === 'GET' || body === null
      ? undefined
      : typeof body === 'string'
        ? resolveVariables(body)
        : body,
  })
  const responseText = await response.text()
  let data: unknown = null
  if (responseText) {
    try {
      data = JSON.parse(responseText)
    } catch {
      data = responseText
    }
  }

  return {
    status: response.status,
    duration: Math.max(1, Math.round(performance.now() - startedAt)),
    data,
  }
}
