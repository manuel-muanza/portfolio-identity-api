import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const deleteDeviceDocumentation: EndpointDocumentation = {
  overview: 'Remove da conta o dispositivo identificado pelo deviceId.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'O deviceId será preenchido através da variável global correspondente.',
  ],
  steps: [
    'Execute Login ou Listar dispositivos para obter o deviceId desejado.',
    'Confirme que {{deviceId}} corresponde ao dispositivo que deve ser removido.',
    'Execute Eliminar dispositivo. O Bearer token será aplicado automaticamente.',
  ],
  notes: ['Esta requisição não possui body e remove a associação do dispositivo à conta.'],
}
