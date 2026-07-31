import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const validatePasswordResetDocumentation: EndpointDocumentation = {
  overview: 'Valida se a operação e o token de reposição da palavra-passe ainda estão válidos.',
  requirements: [
    'O fluxo de reposição deve ter sido solicitado anteriormente.',
    'Deve existir um resetToken válido.',
  ],
  steps: [
    'Execute Solicitar reposição e conclua as verificações indicadas pela API.',
    'Quando a resposta devolver resetToken, o portal guardará o valor automaticamente.',
    'Execute Validar operação antes de alterar a palavra-passe.',
  ],
  notes: [
    'Esta requisição não possui body nem Bearer token.',
    'O placeholder {{resetToken}} é substituído automaticamente.',
  ],
}
