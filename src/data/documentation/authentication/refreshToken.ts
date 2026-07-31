import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const refreshTokenDocumentation: EndpointDocumentation = {
  overview: 'Emite um novo access token sem exigir novamente as credenciais do utilizador.',
  requirements: ['O refresh token deve estar válido e não pode ter sido revogado.'],
  steps: [
    'Conclua o Login para que o portal guarde refreshToken.',
    'Execute Refresh token. O placeholder {{refreshToken}} será substituído automaticamente.',
    'Se a resposta devolver novos accessToken ou refreshToken, os valores globais serão atualizados.',
  ],
  notes: ['Não é necessário copiar manualmente o refresh token da resposta para o body.'],
  fields: [
    { name: 'refresh_token', type: 'string', required: true, description: 'Refresh token recebido durante a autenticação.' },
  ],
}
