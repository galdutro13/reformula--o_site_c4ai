// Contrato de aceitação independente de src/i18n/routes.ts e das coleções.
// Alterar somente quando o requisito mudar, com justificativa na revisão.
export const requiredPages = [
  {
    path: '/',
    status: 200,
    lang: 'pt-BR',
    title: 'C4AI | Português / English',
    heading: 'Escolha seu idioma',
    description:
      'Escolha o idioma do site do C4AI. Choose the language of the C4AI website.',
  },
  {
    path: '/pt/',
    status: 200,
    lang: 'pt-BR',
    title: 'C4AI | Início',
    heading: 'Um ponto de partida para o novo site',
    description:
      'Estrutura demonstrativa bilíngue para a reformulação do site do C4AI.',
  },
  {
    path: '/en/',
    status: 200,
    lang: 'en',
    title: 'C4AI | Home',
    heading: 'A starting point for the new website',
    description:
      'A bilingual demonstration structure for the C4AI website redesign.',
  },
  {
    path: '/404.html',
    // Documento existente: 200. Uma URL inexistente deve retornar 404 no teste funcional.
    status: 200,
    lang: 'pt-BR',
    title: 'C4AI | Página não encontrada / Page not found',
    heading: 'Página não encontrada',
    description:
      'Página não encontrada. Volte ao início. Page not found. Return to the home page.',
  },
] as const;
export const expectedAlternates = {
  'pt-BR': 'http://127.0.0.1:4321/pt/',
  en: 'http://127.0.0.1:4321/en/',
  'x-default': 'http://127.0.0.1:4321/',
};
