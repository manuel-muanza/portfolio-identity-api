import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const deleteAvatarDocumentation: EndpointDocumentation = {
  overview: 'Remove a foto de perfil atualmente associada ao utilizador autenticado.',
  requirements: [
    'A requisição deve possuir um access token válido.',
  ],
  notes: [
    'Esta requisição não possui body.',
    'O Bearer token é adicionado automaticamente pelo portal.',
    'Depois da remoção, o perfil poderá voltar a apresentar a imagem padrão.',
  ],
}
