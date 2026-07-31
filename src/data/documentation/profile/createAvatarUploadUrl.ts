import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const createAvatarUploadUrlDocumentation: EndpointDocumentation = {
  overview:
    'Gera uma URL temporária que poderá ser utilizada para enviar uma nova foto de perfil.',
  requirements: [
    'A requisição deve possuir um access token válido.',
    'O tipo e o tamanho devem corresponder ao ficheiro que será enviado.',
  ],
  steps: [
    'Execute Gerar URL temporária.',
    'Copie a URL devolvida pela API.',
    'Utilize a URL dentro do período de validade para enviar o ficheiro da foto de perfil.',
  ],
  fields: [
    {
      name: 'contentType',
      type: 'string',
      required: true,
      description: 'MIME type da imagem que será enviada, por exemplo image/png.',
    },
    {
      name: 'size',
      type: 'number',
      required: true,
      description: 'Tamanho exato do ficheiro em bytes.',
    },
  ],
  notes: [
    'A URL temporária pode expirar e deve ser utilizada apenas para o upload solicitado.',
    'O Bearer token é adicionado automaticamente pelo portal.',
  ],
}
