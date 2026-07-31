import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const updatePreferencesDocumentation: EndpointDocumentation = {
  overview:
    'Atualiza as preferências de notificações, aparência e idioma do utilizador autenticado.',
  requirements: ['A requisição deve possuir um access token válido.'],
  fields: [
    {
      name: 'emailNotificationsEnabled',
      type: 'boolean',
      required: true,
      description: 'Ativa ou desativa as notificações enviadas por e-mail.',
    },
    {
      name: 'smsNotificationsEnabled',
      type: 'boolean',
      required: true,
      description: 'Ativa ou desativa as notificações enviadas por SMS.',
    },
    {
      name: 'theme',
      type: 'string',
      required: true,
      description: 'Tema visual da conta. Valores aceitos: LIGHT, DARK ou SYSTEM.',
    },
    {
      name: 'language',
      type: 'string',
      required: true,
      description: 'Idioma da conta. Valores aceitos: pt-ao ou en-us.',
    },
  ],
  notes: ['O Bearer token é adicionado automaticamente pelo portal.'],
}
