import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const securityListDevicesDocumentation: EndpointDocumentation = {
  overview: 'Lista os dispositivos associados à conta do utilizador autenticado.',
  requirements: ['A requisição deve possuir um access token válido.'],
  steps: [
    'Conclua o fluxo de Login até receber accessToken.',
    'Execute Listar dispositivos. O Bearer token será aplicado automaticamente.',
  ],
  notes: ['Esta requisição não possui body.'],
}
