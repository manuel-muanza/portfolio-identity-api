import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const generateCodeDocumentation: EndpointDocumentation = {
  overview: 'Gera ou reenvia um código para o processo identificado pelo verificationToken.',
  requirements: [
    'Deve existir um sessionId armazenado a partir de uma resposta anterior.',
    'O sessionId será utilizado automaticamente como verificationToken na URL.',
  ],
  steps: [
    'Execute Login ou outra requisição que inicie uma verificação e devolva sessionId.',
    'Escolha EMAIL, PHONE ou TOTP no campo method.',
    'Execute Enviar código. A mesma requisição pode ser utilizada para reenviar o código.',
    'Continue em Segurança → Verificações → Verificar código.',
  ],
  notes: [
    'O portal substitui {{verificationToken}} pelo sessionId mais recente.',
    'Esta requisição não envia Bearer token.',
  ],
  fields: [
    {
      name: 'method',
      type: 'string',
      required: true,
      description: 'Método utilizado para receber ou gerar o código. Valores aceitos: EMAIL, PHONE ou TOTP.',
    },
  ],
}
