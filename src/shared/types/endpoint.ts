export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface KeyValuePair {
  id: string
  key: string
  value: string
}

export interface DocumentationField {
  name: string
  type: string
  required: boolean
  description: string
}

export interface EndpointDocumentation {
  overview: string
  requirements?: string[]
  steps?: string[]
  notes?: string[]
  fields?: DocumentationField[]
}

export interface Endpoint {
  id: string
  name: string
  method: HttpMethod
  path: string
  description: string
  documentation?: EndpointDocumentation
  bodyType?: 'json' | 'binary'
  requestBody?: string
  response: Record<string, unknown>
}

export interface EndpointCollection {
  id: string
  name: string
  icon: 'lock' | 'users' | 'devices' | 'preferences'
  endpoints: Endpoint[]
  groups?: EndpointGroup[]
}

export interface EndpointGroup {
  id: string
  name: string
  endpoints: Endpoint[]
}

export interface ApiResult {
  status: number
  duration: number
  data: unknown
}
