import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const createAccountDocumentation: EndpointDocumentation = {
  overview:
    'Cria uma nova conta de utilizador utilizando os dados pessoais, o identificador e a palavra-passe informados.',
  requirements: [
    'O identificador ainda não deve estar associado a outra conta.',
    'O e-mail deve conter uma referência ao primeiro e ao último nome do utilizador, e não apenas um nome isolado.',
    'Todos os campos obrigatórios devem ser enviados no formato JSON.',
  ],
  steps: [
    'Preencha os dados da nova conta.',
    'O portal gera ou reutiliza as chaves Ed25519 do identifier e preenche publicKey quando o campo existir no body.',
    'Execute a requisição e siga eventuais instruções de verificação retornadas pela API.',
    'Depois da criação e verificação, utilize Authentication → Login.',
  ],
  notes: ['A criação da conta não envia Bearer token.'],
  fields: [
    {
      name: 'firstName',
      type: 'string',
      required: true,
      description: 'Primeiro nome do utilizador.',
    },
    {
      name: 'lastName',
      type: 'string',
      required: true,
      description: 'Último nome do utilizador.',
    },
    {
      name: 'identifierType',
      type: 'string',
      required: true,
      description: 'Tipo do identificador utilizado no cadastro. Neste fluxo, use EMAIL.',
    },
    {
      name: 'identifier',
      type: 'string',
      required: true,
      description: 'E-mail da nova conta, contendo primeiro e último nome, por exemplo manuel.muanza@gmail.com.',
    },
    {
      name: 'password',
      type: 'string',
      required: true,
      description: 'Palavra-passe que será associada à nova conta.',
    },
  ],
}
