import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const logoutDocumentation: EndpointDocumentation = {
  overview: 'Encerra a sessão atual e impede que o token seja utilizado novamente.',
  requirements: ['A requisição deve possuir um access token válido.'],
  steps: [
    'Faça Login e conclua eventuais verificações até receber o accessToken.',
    'Execute Logout. O portal adicionará automaticamente Authorization: Bearer {{token}}.',
  ],
  notes: ['Esta requisição não possui body. Uma resposta sem conteúdo será apresentada como uma caixa vazia.'],
}
