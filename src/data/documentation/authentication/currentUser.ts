import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const currentUserDocumentation: EndpointDocumentation = {
  overview: 'Retorna os dados públicos e de acesso do utilizador associado ao token atual.',
  requirements: ['A requisição deve possuir um access token válido.'],
}
