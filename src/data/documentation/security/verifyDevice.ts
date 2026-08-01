import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const securityVerifyDeviceDocumentation: EndpointDocumentation = {
  overview: 'Verifica a autenticidade de um dispositivo através do desafio e da assinatura informados.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'deviceId, challenge e signature serão preenchidos através das variáveis globais.',
  ],
  steps: [
    'Execute Login com trustThisDevice igual a true.',
    'Conclua a verificação por código caso ela seja solicitada e execute Login novamente.',
    'Quando Login devolver publicKeyChallenge e deviceId, abra esta requisição.',
    'Ao enviar, o portal assina challenge com a chave privada Ed25519 e preenche signature automaticamente.',
    'Depois da verificação, o dispositivo estará confirmado para a sessão já autenticada; não é necessário executar Login novamente.',
  ],
  notes: [
    'A chave privada nunca é enviada para a API.',
    'deviceId, challenge e signature não precisam ser copiados manualmente.',
  ],
  fields: [
    { name: 'deviceId', type: 'string', required: true, description: 'Identificador global do dispositivo.' },
    { name: 'challenge', type: 'string', required: true, description: 'Desafio de segurança recebido no fluxo de autenticação.' },
    { name: 'signature', type: 'string', required: true, description: 'Assinatura gerada para responder ao desafio.' },
  ],
}
