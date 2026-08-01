import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const changePasswordDocumentation: EndpointDocumentation = {
  overview: 'Altera a palavra-passe do utilizador autenticado após validar a palavra-passe atual.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'A palavra-passe atual deve estar correta.',
    'newPassword e confirmPassword devem possuir o mesmo valor.',
    'A nova palavra-passe não pode repetir nenhuma das últimas cinco senhas utilizadas.',
  ],
  fields: [
    {
      name: 'currentPassword',
      type: 'string',
      required: true,
      description: 'Palavra-passe atualmente associada à conta.',
    },
    {
      name: 'newPassword',
      type: 'string',
      required: true,
      description: 'Nova palavra-passe que será associada à conta.',
    },
    {
      name: 'confirmPassword',
      type: 'string',
      required: true,
      description: 'Confirmação da nova palavra-passe. Deve ser igual a newPassword.',
    },
  ],
  notes: [
    'O Bearer token é adicionado automaticamente pelo portal.',
    'Depois da alteração, sessões ou tokens existentes podem ser revogados conforme a política da API.',
    'A API mantém um histórico e impede a reutilização das últimas cinco senhas.',
  ],
}
