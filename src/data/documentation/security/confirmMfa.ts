import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const confirmMfaDocumentation: EndpointDocumentation = {
  overview:
    'Confirma e ativa a configuração MFA depois que o primeiro código TOTP foi validado com sucesso.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'Start Setting MFA deve ter sido executado.',
    'O código TOTP deve ter sido validado em Segurança → Verificações → Verificar código.',
  ],
  steps: [
    'Execute Start Setting MFA e adicione o QR Code à aplicação autenticadora.',
    'Vá diretamente para Segurança → Verificações → Verificar código.',
    'Use method igual a TOTP e informe o código exibido na aplicação. Não execute Enviar código.',
    'Depois da validação bem-sucedida, volte para Segurança → MFA → Confirm MFA.',
    'Execute Confirm MFA para concluir e ativar a configuração.',
  ],
  notes: [
    'Esta requisição não possui body.',
    'O Bearer token é adicionado automaticamente pelo portal.',
  ],
}
