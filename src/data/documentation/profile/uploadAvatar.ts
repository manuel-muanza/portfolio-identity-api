import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const uploadAvatarDocumentation: EndpointDocumentation = {
  overview:
    'Envia a imagem binária diretamente para a URL temporária da AWS gerada anteriormente.',
  requirements: [
    'Execute primeiro Gerar URL temporária.',
    'O tipo e o tamanho da imagem devem corresponder aos dados usados para gerar a URL.',
    'A URL temporária deve estar dentro do período de validade.',
  ],
  steps: [
    'Selecione uma imagem do dispositivo ou informe uma URL de imagem.',
    'Confira o preview e clique em Confirmar imagem.',
    'Execute Upload Foto para enviar o binário diretamente à AWS.',
  ],
  notes: [
    'Esta requisição utiliza a variável global uploadUrl e não a URL base da API.',
    'O Content-Type é atualizado automaticamente conforme a imagem selecionada.',
    'O Bearer token não é enviado para a URL assinada da AWS.',
    'Imagens externas dependem da permissão CORS do servidor de origem.',
  ],
}
