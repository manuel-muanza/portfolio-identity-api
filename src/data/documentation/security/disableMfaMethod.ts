import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const disableMfaMethodDocumentation: EndpointDocumentation = {
  overview:
    'Desativa um método de verificação do utilizador para que deixe de ser oferecido no Login e em outros fluxos de segurança.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'O método informado deve estar ativo para o utilizador.',
  ],
  steps: [
    'Escolha EMAIL, PHONE ou TOTP no campo method.',
    'Execute Desativar método.',
    'Consulte Listar métodos para confirmar a alteração.',
  ],
  fields: [
    {
      name: 'method',
      type: 'string',
      required: true,
      description: 'Método que será desativado. Valores aceitos: EMAIL, PHONE ou TOTP.',
    },
  ],
  notes: [
    'Esta requisição utiliza o método HTTP DELETE com body JSON.',
    'O Bearer token é adicionado automaticamente pelo portal.',
  ],
}
