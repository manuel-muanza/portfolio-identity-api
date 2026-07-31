import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const validateSocialLoginDocumentation: EndpointDocumentation = {
  overview: 'Valida o ID token emitido pelo Google e conclui a autenticação social.',
  requirements: [
    'Deve existir uma autenticação válida realizada no Google.',
    'O utilizador deve copiar o ID token emitido pelo Google.',
  ],
  steps: [
    'Realize a autenticação através do Google.',
    'Copie o ID token devolvido pelo Google.',
    'Cole o valor no campo idToken e execute Validar login.',
    'Siga eventuais verificações adicionais indicadas pela resposta.',
  ],
  fields: [
    {
      name: 'idToken',
      type: 'string',
      required: true,
      description: 'ID token emitido pelo Google e colado manualmente pelo utilizador.',
    },
  ],
  notes: ['Tokens e sessionId presentes na resposta serão guardados automaticamente.'],
}
