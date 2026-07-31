import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const getProfileDocumentation: EndpointDocumentation = {
  overview: 'Consulta os dados do perfil do utilizador autenticado.',
  requirements: ['A requisição deve possuir um access token válido.'],
  notes: [
    'Esta requisição não possui body.',
    'O Bearer token é adicionado automaticamente pelo portal.',
  ],
}
