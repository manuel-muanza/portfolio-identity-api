import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const createAccountGoogleDocumentation: EndpointDocumentation = {
  overview: 'Cria uma nova conta utilizando a identidade autenticada através do Google.',
  requirements: [
    'O utilizador deve possuir uma conta Google válida.',
    'O e-mail da conta Google ainda não deve estar associado a outra conta.',
  ],
  steps: [
    'Abra Criar conta com Google. O modal de autenticação será apresentado automaticamente.',
    'Entre com a conta Google desejada.',
    'O portal adicionará o ID token automaticamente ao body.',
    'Execute a requisição e siga eventuais verificações adicionais indicadas pela API.',
  ],
  fields: [
    {
      name: 'idToken',
      type: 'string',
      required: true,
      description: 'ID token emitido pelo Google e preenchido automaticamente pelo portal.',
    },
  ],
  notes: [
    'Esta requisição é pública e não envia Bearer token.',
    'Tokens e sessionId presentes na resposta serão guardados automaticamente.',
  ],
}
