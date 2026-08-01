import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const loginDocumentation: EndpointDocumentation = {
  overview:
    'Este endpoint inicia uma sessão através das credenciais do utilizador. Dependendo da política de segurança, a API pode solicitar uma etapa adicional de verificação.',
  requirements: [
    'O utilizador deve possuir uma conta ativa.',
    'O identifier deve corresponder ao tipo de autenticação informado.',
    'O portal gera ou reutiliza automaticamente um par de chaves Ed25519 para o identifier.',
  ],
  steps: [
    'Execute Login com trustThisDevice igual a true. O portal preenche publicKey automaticamente.',
    'Se a resposta solicitar verificação, o portal guardará sessionId como verificationToken.',
    'Abra Segurança → Verificações → Enviar código para solicitar o código por EMAIL, PHONE ou TOTP.',
    'Abra Segurança → Verificações → Verificar código e envie o código recebido.',
    'Depois da validação, execute Login novamente com as mesmas credenciais.',
    'Se a resposta incluir publicKeyChallenge e deviceId, use Segurança → Dispositivos → Verificar dispositivo.',
    'A verificação do dispositivo apenas confirma o dispositivo atual; o utilizador já estará autenticado e não precisará executar Login novamente.',
  ],
  notes: [
    'accessToken, refreshToken, sessionId, publicKeyChallenge e deviceId são guardados automaticamente quando aparecem na resposta.',
    'Se trustThisDevice for true e a API devolver publicKeyChallenge igual a null, o portal considera a chave do dispositivo inválida ou revogada e gera um novo par Ed25519 no próximo Login.',
    'Uma chave estável continua sendo reutilizada enquanto o backend devolver um challenge válido para o dispositivo reconhecido.',
    'A resposta da API não é alterada pelo portal.',
  ],
  fields: [
    {
      name: 'type',
      type: 'string',
      required: true,
      description: 'Tipo de identificação utilizado. Para este fluxo, use EMAIL.',
    },
    {
      name: 'identifier',
      type: 'string',
      required: true,
      description: 'Endereço de e-mail do utilizador.',
    },
    {
      name: 'password',
      type: 'string',
      required: true,
      description: 'Palavra-passe associada à conta.',
    },
    {
      name: 'publicKey',
      type: 'string',
      required: false,
      description: 'Chave pública limpa utilizada nos fluxos que exigem criptografia.',
    },
    {
      name: 'trustThisDevice',
      type: 'boolean',
      required: false,
      description: 'Indica se o dispositivo atual deve ser considerado confiável.',
    },
  ],
}
