import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const startMfaDocumentation: EndpointDocumentation = {
  overview:
    'Inicia a configuração de autenticação multifator por TOTP para o utilizador autenticado.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'O utilizador precisa ter acesso a uma aplicação autenticadora compatível com TOTP.',
  ],
  steps: [
    'Execute Start Setting MFA. Esta requisição não possui body.',
    'No modal apresentado, leia o QR Code com uma aplicação como Google Authenticator, Microsoft Authenticator ou Authy.',
    'Se não for possível ler o QR Code, copie e introduza manualmente o secret na aplicação.',
    'Guarde a conta na aplicação autenticadora e clique em Continuar.',
    'Vá diretamente para Segurança → Verificações → Verificar código, use method TOTP e informe o código da aplicação.',
    'Depois de validar o código, execute Segurança → MFA → Confirm MFA.',
  ],
  notes: [
    'A resposta contém secret, qrCodeUrl e sessionId.',
    'O sessionId é guardado automaticamente como verificationToken para as próximas etapas.',
    'No fluxo TOTP não é necessário executar Enviar código, pois o código é gerado pela aplicação autenticadora.',
    'Não compartilhe o secret nem o QR Code.',
  ],
}
