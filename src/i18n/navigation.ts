import type { Locale } from './ui';
export const labels = {
  pt: {
    home: 'Home',
    about: 'Sobre',
    research: 'Pesquisas',
    news: 'Notícias',
    resources: 'Recursos',
    opportunities: 'Oportunidades',
    menu: 'Menu',
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
    partnership: 'Uma parceria de:',
    hosted: 'C4AI é sediado por',
    page: 'Página',
  },
  en: {
    home: 'Home',
    about: 'About',
    research: 'Research',
    news: 'News',
    resources: 'Resources',
    opportunities: 'Opportunities',
    menu: 'Menu',
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
    partnership: 'A partnership of:',
    hosted: 'C4AI is hosted by',
    page: 'Page',
  },
};
export const aboutSections = {
  pt: [
    ['lideranca', 'Liderança'],
    ['difusao', 'Difusão'],
    ['diversidade', 'Diversidade & Inclusão'],
    ['impacto', 'Impacto & Parceiros'],
    ['contato', 'Contato'],
  ],
  en: [
    ['leadership', 'Leadership'],
    ['outreach', 'Outreach'],
    ['diversity', 'Diversity & Inclusion'],
    ['impact', 'Impact & Partners'],
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
    {
      label: pt
        ? 'Diversidade & Inclusão Portal'
        : 'Diversity & Inclusion Portal',
      href: 'https://c4ai.inova.usp.br/cid/',
    },
    {
      label: pt ? 'Parceiros Portal' : 'Partners Portal',
      href: `https://c4ai.inova.usp.br/${pt ? 'pt/parceiros' : 'partners'}/`,
    },
  ];
}
