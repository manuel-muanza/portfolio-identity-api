import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const listMfaMethodsDocumentation: EndpointDocumentation = {
  overview:
    'Lista os métodos de verificação disponíveis e o estado de ativação de cada método para o utilizador.',
  requirements: ['A requisição deve possuir um access token válido.'],
  steps: [
    'Execute Listar métodos.',
    'Consulte a resposta para identificar quais métodos podem ser utilizados no Login e em outras verificações.',
  ],
  notes: [
    'Esta requisição não possui body.',
    'Os métodos suportados pelo fluxo são EMAIL, PHONE e TOTP.',
    'O Bearer token é adicionado automaticamente pelo portal.',
  ],
}
