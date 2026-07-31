import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const getPreferencesDocumentation: EndpointDocumentation = {
  overview:
    'Consulta as preferências atuais de notificações, aparência e idioma do utilizador autenticado.',
  requirements: ['A requisição deve possuir um access token válido.'],
  steps: [
    'Execute Ver preferências.',
    'Consulte na resposta as configurações atualmente guardadas para o utilizador.',
  ],
  notes: [
    'Esta requisição não possui body.',
    'O Bearer token é adicionado automaticamente pelo portal.',
  ],
}
