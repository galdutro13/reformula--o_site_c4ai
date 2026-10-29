import type { Locale } from '../i18n/ui';

interface OverviewImage {
  src: string;
  alt: string;
}

interface AboutOverview {
  title: string;
  paragraphs: [string, string];
  moreLabel: string;
  details: string;
  image: OverviewImage;
  principlesLabel: string;
  principles: [
    { title: string; text: string },
    { title: string; text: string },
  ];
  location: {
    label: string;
    title: string;
    text: string;
    address: string;
    postalCode: string;
    action: string;
    contactAnchor: 'contato' | 'contact';
    image: OverviewImage;
  };
}

// Conteúdo institucional preservado; distribuição autorizada em 15/10/2026.
export const aboutOverviewContent = {
  pt: {
    title: 'C4AI',
    paragraphs: [
      'O Centro de Inteligência Artificial (Center for Artificial Intelligence – C4AI) tem o compromisso de desenvolver pesquisas no estado da arte em Inteligência Artificial (IA), explorando tanto aspectos básicos quanto aplicados nesta área.',
      'O C4AI foi criado em 2020 com apoio da IBM e da Fundação de Amparo à Pesquisa do Estado de São Paulo (FAPESP), dentro do Programa de Centros de Pesquisa Aplicada.',
    ],
    moreLabel: 'Saiba mais sobre o C4AI',
    details:
      'O C4AI considera que o próximo nível de desempenho em IA só poderá ser alcançado enfatizando a combinação de aprendizado de máquina, tomada de decisão, representação de conhecimento e raciocínio, e incrementando a colaboração entre essas áreas e suas aplicações. O C4AI também desenvolve estudos sobre o impacto social e econômico da IA e conduz atividades de disseminação de conhecimento e transferência de tecnologia, procurando formas de melhorar a qualidade de vida humana.',
    image: {
      src: '/media/8b64dc5090e1.jpg',
      alt: 'Fachada envidraçada de um edifício, com pilares e escadaria de acesso.',
    },
    principlesLabel: 'Missão e visão',
    principles: [
      {
        title: 'Missão',
        text: 'Produzir pesquisa avançada em Inteligência Artificial no Brasil, disseminando e debatendo os principais resultados, treinando estudantes e profissionais, e transferindo a tecnologia para a sociedade.',
      },
      {
        title: 'Visão',
        text: 'Ser um centro de excelência de nível mundial em Inteligência Artificial e uma organização essencial para a comunidade científica e a sociedade no Brasil.',
      },
    ],
    location: {
      label: 'Localização',
      title: 'Onde estamos',
      text: 'O C4AI é sediado no CIAAM e localizado no InovaUSP, um espaço para inovação e pesquisa multidisciplinar no coração do campus Butantã da USP.',
      address:
        'Av. Profº Lúcio Martins Rodrigues, 370 – Butantã – São Paulo – SP',
      postalCode: 'CEP: 05508-020',
      action: 'Como chegar',
      contactAnchor: 'contato',
      image: {
        src: '/media/42ddc70db70c.jpg',
        alt: 'Edifício entre árvores, com um pátio e bandeiras à frente.',
      },
    },
  },
  en: {
    title: 'C4AI',
    paragraphs: [
      'The Center for Artificial Intelligence (Centro de Inteligência Artificial – C4AI) is committed to developing state-of-the-art research in Artificial Intelligence (AI), exploring both basic and applied aspects of this field.',
      'C4AI was created in 2020 with support from IBM and the São Paulo Research Foundation (FAPESP), within the Applied Research Centers Program.',
    ],
    moreLabel: 'Learn more about C4AI',
    details:
      'C4AI considers that the next level of AI performance can only be achieved by emphasizing the combination of machine learning, decision-making, knowledge representation and reasoning, and increasing collaboration between these areas and their applications. C4AI also conducts studies on the social and economic impact of AI and carries out knowledge dissemination and technology transfer activities, seeking ways to improve human quality of life.',
    image: {
      src: '/media/8b64dc5090e1.jpg',
      alt: 'Glass-fronted building with columns and an entrance staircase.',
    },
    principlesLabel: 'Mission and vision',
    principles: [
      {
        title: 'Mission',
        text: 'To produce advanced research in Artificial Intelligence in Brazil, disseminate and debate its main results, train students and professionals, and transfer the technology to society.',
      },
      {
        title: 'Vision',
        text: 'To be a world-class center of excellence in Artificial Intelligence and an essential organization for the scientific community and the society in Brazil.',
      },
    ],
    location: {
      label: 'Location',
      title: 'Where we are',
      text: 'C4AI is hosted by CIAAM and located at InovaUSP, a space for innovation and multidisciplinary research in the heart of USP’s Butantã campus.',
      address:
        'Av. Profº Lúcio Martins Rodrigues, 370 – Butantã – São Paulo – SP',
      postalCode: 'CEP: 05508-020',
      action: 'Getting here',
      contactAnchor: 'contact',
      image: {
        src: '/media/42ddc70db70c.jpg',
        alt: 'Building among trees, with a courtyard and flags in front.',
      },
    },
  },
} satisfies Record<Locale, AboutOverview>;
