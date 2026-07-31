import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const requestPasswordResetDocumentation: EndpointDocumentation = {
  overview:
    'Inicia o processo de recuperação da palavra-passe para a conta identificada pelo e-mail.',
  requirements: [
    'O nome e o e-mail devem corresponder aos dados da conta.',
    'O utilizador deve ter acesso ao endereço de e-mail informado.',
  ],
  steps: [
    'Informe o nome completo e o e-mail associados à conta.',
    'Execute Solicitar reposição de senha.',
    'Siga as instruções de verificação devolvidas pela API.',
  ],
  fields: [
    {
      name: 'fullName',
      type: 'string',
      required: true,
      description: 'Nome completo associado à conta.',
    },
    {
      name: 'email',
      type: 'string',
      required: true,
      description: 'Endereço de e-mail associado à conta.',
    },
  ],
  notes: [
    'Esta requisição é pública e não envia Bearer token.',
    'Se a resposta contiver sessionId, o portal guardará o valor automaticamente como verificationToken.',
  ],
}
