import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const enableMfaMethodDocumentation: EndpointDocumentation = {
  overview:
    'Ativa um método de verificação para ser utilizado no Login e em outros fluxos de segurança do utilizador.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'O método escolhido deve estar disponível e configurado para o utilizador.',
  ],
  steps: [
    'Escolha EMAIL, PHONE ou TOTP no campo method.',
    'Execute Ativar método.',
    'Consulte Listar métodos para confirmar que o método ficou ativo.',
  ],
  fields: [
    {
      name: 'method',
      type: 'string',
      required: true,
      description: 'Método que será ativado. Valores aceitos: EMAIL, PHONE ou TOTP.',
    },
  ],
  notes: ['O Bearer token é adicionado automaticamente pelo portal.'],
}
