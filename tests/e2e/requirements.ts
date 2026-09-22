// Contrato independente do mapa de rotas e das coleções. Textos e URLs congelados
// das fontes inventariadas; alterações exigem justificativa editorial na revisão.
import articleRequirements from './article-requirements.json' with { type: 'json' };
export const principalPages = [
  {
    path: '/pt/',
    lang: 'pt-BR',
    title: 'C4AI | Início',
    heading:
      'Um centro de pesquisa para inteligência artificial avançada no Brasil',
    pair: '/en/',
  },
  {
    path: '/en/',
    lang: 'en',
    title: 'C4AI | Home',
    heading: 'A research center for advanced artificial intelligence in Brazil',
    pair: '/pt/',
  },
  {
    path: '/pt/sobre/',
    lang: 'pt-BR',
    title: 'C4AI | Sobre',
    heading: 'Um centro de pesquisa de inteligência artificial no Brasil',
    pair: '/en/about/',
  },
  {
    path: '/en/about/',
    lang: 'en',
    title: 'C4AI | About',
    heading: 'A research center for advanced artificial intelligence in Brazil',
    pair: '/pt/sobre/',
  },
  {
    path: '/pt/pesquisas/',
    lang: 'pt-BR',
    title: 'C4AI | Pesquisas',
    heading: 'Pesquisas no C4AI',
    pair: '/en/research/',
  },
  {
    path: '/en/research/',
    lang: 'en',
    title: 'C4AI | Research',
    heading: 'Research in the C4AI',
    pair: '/pt/pesquisas/',
  },
  {
    path: '/pt/noticias/',
    lang: 'pt-BR',
    title: 'C4AI | Notícias',
    heading: 'C4AI notícias e eventos',
    pair: '/en/news/',
  },
  {
    path: '/en/news/',
    lang: 'en',
    title: 'C4AI | News',
    heading: 'C4AI news and events',
    pair: '/pt/noticias/',
  },
] as const;
export interface RequiredPage {
  path: string;
  lang: string;
  title: string;
  heading: string;
  description?: string;
  pair?: string;
}
export const requiredPages: RequiredPage[] = [
  {
    path: '/',
    lang: 'pt-BR',
    title: 'C4AI | Português / English',
    heading: 'Escolha seu idioma',
    description:
      'Escolha o idioma do site do C4AI. Choose the language of the C4AI website.',
    pair: '/en/',
  },
  ...principalPages.map((p) => ({ ...p, description: p.heading })),
  {
    path: '/pt/noticias/page/2/',
    lang: 'pt-BR',
    title: 'C4AI | Notícias — Página 2',
    heading: 'C4AI notícias e eventos',
    description: 'C4AI notícias e eventos',
    pair: '/en/news/page/2/',
  },
  {
    path: '/en/news/page/2/',
    lang: 'en',
    title: 'C4AI | News — Page 2',
    heading: 'C4AI news and events',
    description: 'C4AI news and events',
    pair: '/pt/noticias/page/2/',
  },
  ...articleRequirements.map((a) => ({
    path: a.path,
    lang: a.locale === 'pt' ? 'pt-BR' : 'en',
    title: `${a.title} | C4AI`,
    heading: a.title,
    description: a.description,
    pair: a.path.includes('luis-lamb')
      ? articleRequirements.find(
          (other) =>
            other.locale !== a.locale && other.path.includes('luis-lamb'),
        )!.path
      : undefined,
  })),
  {
    path: '/404.html',
    lang: 'pt-BR',
    title: 'C4AI | Página não encontrada / Page not found',
    heading: 'Página não encontrada',
    description:
      'Página não encontrada. Volte ao início. Page not found. Return to the home page.',
  },
];
export const challenges = [
  'NLP2',
  'ProIndL',
  'KEML',
  'OceanML',
  'MClimate',
  'OBIA@C4AI',
  'AI Health',
  'AgriBio',
];
export const aboutAnchors = {
  pt: ['lideranca', 'difusao', 'diversidade', 'impacto', 'contato'],
  en: ['leadership', 'outreach', 'diversity', 'impact', 'contact'],
};
export const newsAnchors = {
  pt: [
    'chat_port',
    'seminar_port',
    'mesaRedonda',
    'techLaw_port',
    '05_port',
    'press',
  ],
  en: ['chat', 'seminar', 'roundTable', 'techLaw', '05', 'others'],
};
