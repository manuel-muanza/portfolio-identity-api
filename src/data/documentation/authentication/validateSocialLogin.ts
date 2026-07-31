import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const validateSocialLoginDocumentation: EndpointDocumentation = {
  overview: 'Valida e conclui uma tentativa de autenticação iniciada por um provedor social.',
  requirements: [
    'A rota definitiva e os campos deste endpoint ainda devem ser confirmados.',
    'Deve existir uma tentativa de login social em andamento.',
  ],
  steps: [
    'Primeiro execute Authentication → Social → Login.',
    'Informe os dados recebidos do provedor social.',
    'Execute Validar login e siga eventuais verificações indicadas pela resposta.',
  ],
  notes: ['Tokens e sessionId presentes na resposta serão guardados automaticamente.'],
}
