import type { EndpointDocumentation } from '../../../shared/types/endpoint'

export const socialLoginDocumentation: EndpointDocumentation = {
  overview: 'Inicia o processo de autenticação através de um provedor social.',
  requirements: [
    'A rota definitiva e os campos deste endpoint ainda devem ser confirmados.',
    'O provedor social deve estar habilitado no serviço de identidade.',
  ],
  steps: [
    'Selecione o provedor social e inicie a autenticação.',
    'Guarde os dados devolvidos pelo provedor.',
    'Continue em Authentication → Social → Validar login.',
  ],
  notes: ['Este fluxo será detalhado quando as rotas e os corpos definitivos forem fornecidos.'],
}
