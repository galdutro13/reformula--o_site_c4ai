import type { Locale } from './ui';
export const labels = {
  pt: {
    home: 'Início',
    about: 'Sobre',
    research: 'Pesquisas',
    news: 'Notícias',
    resources: 'Recursos',
    menu: 'Menu',
    closeMenu: 'Fechar',
    overview: 'Visão geral',
    allNews: 'Todas as notícias',
    sections: 'Seções de',
    external: 'site externo',
    unavailable: 'Recurso indisponível',
    search: 'Buscar no acervo migrado',
    searchHint:
      'Sem JavaScript, use a listagem e a paginação ou a busca do navegador.',
    read: 'Leia mais',
    previous: 'Anterior',
    next: 'Próxima',
    archive: 'Acervo migrado',
    categories: 'Categorias',
    recent: 'Posts recentes',
    missing: 'Este artigo não possui tradução disponível.',
    otherNews: 'Ver notícias em inglês',
    load: 'Carregar conteúdo externo',
    open: 'Abrir no site de origem',
    source: 'Fonte original',
    hosted: 'C4AI é sediado no CIAAM',
    page: 'Página',
  },
  en: {
    home: 'Home',
    about: 'About',
    research: 'Research',
    news: 'News',
    resources: 'Resources',
    menu: 'Menu',
    closeMenu: 'Close',
    overview: 'Overview',
    allNews: 'All news',
    sections: 'Sections of',
    external: 'external site',
    unavailable: 'Resource unavailable',
    search: 'Search the migrated archive',
    searchHint:
      'Without JavaScript, use the listing and pagination or your browser’s find function.',
    read: 'Read more',
    previous: 'Previous',
    next: 'Next',
    archive: 'Migrated archive',
    categories: 'Categories',
    recent: 'Recent posts',
    missing: 'No translation is available for this article.',
    otherNews: 'View news in Portuguese',
    load: 'Load external content',
    open: 'Open the original site',
    source: 'Original source',
    hosted: 'C4AI is hosted by CIAAM',
    page: 'Page',
  },
};
export const aboutSections = {
  pt: [
    ['lideranca', 'Liderança'],
    ['difusao', 'Difusão'],
    ['contato', 'Contato'],
  ],
  en: [
    ['leadership', 'Leadership'],
    ['outreach', 'Outreach'],
    ['contact', 'Contact'],
  ],
} as const;
export const newsSections = {
  pt: [
    ['chat_port', 'ChatBot & ChatGPT'],
    ['seminar_port', 'Perspectivas'],
    ['mesaRedonda', 'Mesa Redonda'],
    ['techLaw_port', 'Tech Law'],
    ['05_port', 'Encontros C4AI'],
    ['press', 'Press & Media'],
  ],
  en: [
    ['chat', 'ChatBot & ChatGPT'],
    ['seminar', 'Perspectives'],
    ['roundTable', 'Round Table'],
    ['techLaw', 'Tech Law'],
    ['05', 'C4AI Meetings'],
    ['others', 'Press & Media'],
  ],
} as const;
export function externalResources(locale: Locale) {
  const pt = locale === 'pt';
  return [
    {
      label: pt ? 'Publicações' : 'Publications',
      href: `https://c4ai.inova.usp.br/${pt ? 'pt/publicacoes' : 'publications'}/`,
    },
    {
      label: 'NLP2 – Web Portal',
      href: 'https://sites.google.com/icmc.usp.br/nlp2',
    },
  ];
}
