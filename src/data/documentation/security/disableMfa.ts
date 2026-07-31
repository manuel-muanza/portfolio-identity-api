import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const disableMfaDocumentation: EndpointDocumentation = {
  overview:
    'Desativa a autenticação multifator do utilizador após uma confirmação de segurança por TOTP.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'O MFA deve estar ativo para o utilizador.',
    'O utilizador deve ter acesso à aplicação autenticadora configurada.',
  ],
  steps: [
    'Execute Desativar MFA pela primeira vez.',
    'A API devolverá uma solicitação de verificação e o portal guardará sessionId como verificationToken.',
    'Vá para Segurança → Verificações → Verificar código.',
    'Use method igual a TOTP e informe o código atual da aplicação autenticadora.',
    'Depois da verificação bem-sucedida, volte para Segurança → MFA → Desativar MFA.',
    'Execute novamente Desativar MFA para concluir a desativação.',
  ],
  notes: [
    'Não execute Enviar código neste fluxo, pois o código TOTP é gerado pela aplicação autenticadora.',
    'Esta requisição não possui body.',
    'O Bearer token é adicionado automaticamente pelo portal.',
  ],
}
