import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const registerDocumentation: EndpointDocumentation = {
  overview: 'Cria uma nova conta de utilizador com os dados fornecidos.',
  requirements: ['O endereço de e-mail ainda não deve estar associado a outra conta.'],
  fields: [
    { name: 'name', type: 'string', required: true, description: 'Nome completo do utilizador.' },
    { name: 'email', type: 'string', required: true, description: 'Endereço de e-mail da nova conta.' },
    { name: 'password', type: 'string', required: true, description: 'Palavra-passe da nova conta.' },
  ],
}
