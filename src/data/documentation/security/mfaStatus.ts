import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const mfaStatusDocumentation: EndpointDocumentation = {
  overview:
    'Consulta o estado atual da autenticação multifator do utilizador autenticado.',
  requirements: [
    'A requisição deve possuir um access token válido.',
  ],
  steps: [
    'Conclua o Login até receber o accessToken.',
    'Execute Ver estado do MFA.',
    'Consulte a resposta para saber se o MFA está configurado e ativo para o utilizador.',
  ],
  notes: [
    'Esta requisição não possui body.',
    'O Bearer token é adicionado automaticamente pelo portal.',
  ],
}
