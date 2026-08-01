import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const completePasswordResetDocumentation: EndpointDocumentation = {
  overview: 'Define uma nova palavra-passe utilizando uma operação de reposição previamente validada.',
  requirements: [
    'O resetToken deve estar válido e não pode ter expirado.',
    'newPassword e confirmPassword devem possuir o mesmo valor.',
    'A nova palavra-passe não pode ser igual a nenhuma das últimas cinco senhas utilizadas.',
  ],
  steps: [
    'Execute Validar operação para confirmar que o resetToken está válido.',
    'Informe e confirme a nova palavra-passe.',
    'Execute Mudar senha para concluir o processo.',
  ],
  fields: [
    {
      name: 'newPassword',
      type: 'string',
      required: true,
      description: 'Nova palavra-passe que será associada à conta.',
    },
    {
      name: 'confirmPassword',
      type: 'string',
      required: true,
      description: 'Confirmação da nova palavra-passe. Deve ser igual a newPassword.',
    },
  ],
  notes: [
    'Esta requisição é pública e não envia Bearer token.',
    'O placeholder {{resetToken}} é substituído automaticamente.',
    'A API aplica uma política de histórico e rejeita a reutilização das últimas cinco senhas.',
  ],
}
