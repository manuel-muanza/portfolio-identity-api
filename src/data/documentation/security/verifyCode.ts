import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const verifyCodeDocumentation: EndpointDocumentation = {
  overview: 'Valida o código informado e conclui a etapa de verificação.',
  requirements: [
    'Deve existir um sessionId armazenado, utilizado como verificationToken na URL.',
    'O código deve pertencer a uma verificação ativa.',
  ],
  steps: [
    'Primeiro execute Enviar código com o método desejado.',
    'Informe o mesmo method utilizado no envio e o código recebido.',
    'Execute Verificar código.',
    'Se este fluxo foi iniciado pelo Login, volte para Authentication → Login e execute-o novamente.',
  ],
  notes: [
    'O portal substitui {{verificationToken}} pelo sessionId mais recente.',
    'Um código expirado ou inválido será informado diretamente pela resposta da API.',
    'No fluxo de configuração MFA, use method TOTP diretamente: não execute Enviar código antes da verificação.',
    'Depois de validar o TOTP, execute Segurança → MFA → Confirm MFA.',
  ],
  fields: [
    {
      name: 'method',
      type: 'string',
      required: true,
      description: 'Método pelo qual o código foi recebido ou gerado. Valores aceitos: EMAIL, PHONE ou TOTP.',
    },
    {
      name: 'code',
      type: 'string',
      required: true,
      description: 'Código recebido pelo utilizador.',
    },
  ],
}
