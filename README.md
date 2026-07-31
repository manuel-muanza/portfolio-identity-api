# Teste de API

Portal web para explorar, documentar e testar os endpoints da Identity API da Biva.

O projeto permite montar requisições HTTP, editar headers, parâmetros e bodies, visualizar respostas e executar fluxos completos de autenticação, verificação, MFA, dispositivos, perfil e preferências.

## Tecnologias

- React 19
- TypeScript
- Vite
- Web Crypto API

## Executar localmente

```bash
npm install
npm run dev
```

A URL base da API está configurada no arquivo `.env`:

```env
VITE_API_BASE_URL=https://identity.biva.co.ao
```

## Validação

```bash
npm run lint
npm run build
```
