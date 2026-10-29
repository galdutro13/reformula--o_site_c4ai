import type { Locale } from '../i18n/ui';

interface LeadershipProfile {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  biography: string;
  image: { src: string; alt: string };
  link?: { label: string; href: string };
}

interface LeadershipGroup {
  id: 'leadership-executive' | 'leadership-management';
  title: string;
  profiles: [LeadershipProfile, LeadershipProfile, LeadershipProfile];
}

interface LeadershipContent {
  id: 'lideranca' | 'leadership';
  title: string;
  introduction: string;
  groups: [LeadershipGroup, LeadershipGroup];
}

// Os grupos descrevem os cargos aprovados e preservam a ordem dos seis perfis.
// Fontes e decisões editoriais: docs/reformulation/2026-10-16-about-leadership/editorial.md.
export const aboutLeadershipContent = {
  pt: {
    id: 'lideranca',
    title: 'Liderança',
    introduction:
      'Conheça os profissionais responsáveis pela direção, coordenação, gestão e apoio administrativo do C4AI.',
    groups: [
      {
        id: 'leadership-executive',
        title: 'Direção e coordenação',
        profiles: [
          {
            id: 'fabio-cozman',
            name: 'Fabio Cozman',
            role: 'Diretor',
            affiliation: 'Universidade de São Paulo — USP',
            biography:
              'Engenheiro pela Escola Politécnica da USP e doutor pela Carnegie Mellon University. Professor titular da Escola Politécnica da USP.',
            image: {
              src: '/media/efe3a205cbf2.jpg',
              alt: 'Retrato de Fabio Cozman.',
            },
            link: {
              label: 'Site pessoal',
              href: 'http://sites.poli.usp.br/p/fabio.cozman/',
            },
          },
          {
            id: 'fernando-osorio',
            name: 'Fernando Osório',
            role: 'Coordenador de Divulgação',
            affiliation: 'Universidade de São Paulo — USP',
            biography:
              'Doutor em Ciência da Computação pelo Institut National Polytechnique de Grenoble, França. Professor e pesquisador do ICMC-USP, em São Carlos, com atuação em inteligência artificial e robótica.',
            image: {
              src: '/media/f907124dd99d.jpg',
              alt: 'Retrato de Fernando Osório.',
            },
            link: {
              label: 'Currículo Lattes',
              href: 'http://lattes.cnpq.br/7396818382676736',
            },
          },
          {
            id: 'joao-paulo-veiga',
            name: 'João Paulo Veiga',
            role: 'Coordenador de Impacto (atuação)',
            affiliation: 'Universidade de São Paulo — USP',
            biography:
              'Bacharel em Ciências Sociais, mestre e doutor em Ciência Política pela USP. Professor do Departamento de Ciência Política da FFLCH-USP e do Instituto de Relações Internacionais da USP.',
            image: {
              src: '/media/b6008f555305.jpg',
              alt: 'Retrato de João Paulo Veiga.',
            },
            link: {
              label: 'Currículo Lattes',
              href: 'http://lattes.cnpq.br/1059788774957753',
            },
          },
        ],
      },
      {
        id: 'leadership-management',
        title: 'Gestão e apoio administrativo',
        profiles: [
          {
            id: 'jairo-carlos-filho',
            name: 'Jairo Carlos Filho',
            role: 'Gerente Executivo',
            affiliation: 'Universidade de São Paulo — USP',
            biography:
              'Estudos em Engenharia Eletrônica na FEI, com MBA em Engenharia da Qualidade pela Escola Politécnica da USP e formação em Gestão Pública pela FEARP-USP.',
            image: {
              src: '/media/c071e689c793.jpg',
              alt: 'Retrato de Jairo Carlos Filho.',
            },
          },
          {
            id: 'mauricio-klein',
            name: 'Maurício Klein',
            role: 'Gerente de Difusão',
            affiliation: 'Universidade de São Paulo — USP',
            biography:
              'Bacharel em Design Arquitetônico e Urbanístico e mestre em Engenharia de Segurança do Trabalho. Atua em comunicação, design digital e mídia na USP desde 2006.',
            image: {
              src: '/media/73844d6075ec.jpg',
              alt: 'Retrato de Maurício Klein.',
            },
          },
          {
            id: 'eliana-futenma',
            name: 'Eliana Futenma',
            role: 'Assistente Administrativo',
            affiliation: 'Fundação de Apoio à Universidade de São Paulo — FUSP',
            biography:
              'Técnica em Secretariado pela ETEC e graduada em Administração pela ESAN/FEI.',
            image: {
              src: '/media/109798fa012e.jpg',
              alt: 'Retrato de Eliana Futenma.',
            },
          },
        ],
      },
    ],
  },
  en: {
    id: 'leadership',
    title: 'Leadership',
    introduction:
      'Meet the professionals responsible for C4AI’s direction, coordination, management and administrative support.',
    groups: [
      {
        id: 'leadership-executive',
        title: 'Leadership and coordination',
        profiles: [
          {
            id: 'fabio-cozman',
            name: 'Fabio Cozman',
            role: 'Director',
            affiliation: 'University of São Paulo — USP',
            biography:
              'Engineer from USP’s Polytechnic School and PhD from Carnegie Mellon University. Full professor at USP’s Polytechnic School.',
            image: {
              src: '/media/efe3a205cbf2.jpg',
              alt: 'Portrait of Fabio Cozman.',
            },
            link: {
              label: 'Personal website',
              href: 'http://sites.poli.usp.br/p/fabio.cozman/',
            },
          },
          {
            id: 'fernando-osorio',
            name: 'Fernando Osório',
            role: 'Outreach Coordinator',
            affiliation: 'University of São Paulo — USP',
            biography:
              'PhD in Computer Science from Institut National Polytechnique de Grenoble, France. Professor and researcher at ICMC-USP in São Carlos, working in artificial intelligence and robotics.',
            image: {
              src: '/media/f907124dd99d.jpg',
              alt: 'Portrait of Fernando Osório.',
            },
            link: {
              label: 'Lattes CV',
              href: 'http://lattes.cnpq.br/7396818382676736',
            },
          },
          {
            id: 'joao-paulo-veiga',
            name: 'João Paulo Veiga',
            role: 'Impact Coordinator (acting)',
            affiliation: 'University of São Paulo — USP',
            biography:
              'Bachelor’s degree in Social Sciences and a master’s degree and PhD in Political Science from USP. Professor at USP’s Department of Political Science (FFLCH) and Institute of International Relations.',
            image: {
              src: '/media/b6008f555305.jpg',
              alt: 'Portrait of João Paulo Veiga.',
            },
            link: {
              label: 'Lattes CV',
              href: 'http://lattes.cnpq.br/1059788774957753',
            },
          },
        ],
      },
      {
        id: 'leadership-management',
        title: 'Management and administrative support',
        profiles: [
          {
            id: 'jairo-carlos-filho',
            name: 'Jairo Carlos Filho',
            role: 'Executive Manager',
            affiliation: 'University of São Paulo — USP',
            biography:
              'Studies in Electronic Engineering at FEI, with an MBA in Quality Engineering from USP’s Polytechnic School and training in Public Management at FEARP-USP.',
            image: {
              src: '/media/c071e689c793.jpg',
              alt: 'Portrait of Jairo Carlos Filho.',
            },
          },
          {
            id: 'mauricio-klein',
            name: 'Maurício Klein',
            role: 'Diffusion Manager',
            affiliation: 'University of São Paulo — USP',
            biography:
              'Bachelor’s degree in Architectural and Urban Design and a master’s degree in Occupational Safety Engineering. Has worked in communication, digital design and media at USP since 2006.',
            image: {
              src: '/media/73844d6075ec.jpg',
              alt: 'Portrait of Maurício Klein.',
            },
          },
          {
            id: 'eliana-futenma',
            name: 'Eliana Futenma',
            role: 'Administrative Assistant',
            affiliation: 'Fundação de Apoio à Universidade de São Paulo — FUSP',
            biography:
              'Technical training in Secretarial Studies at ETEC and a degree in Business Administration from ESAN/FEI.',
            image: {
              src: '/media/109798fa012e.jpg',
              alt: 'Portrait of Eliana Futenma.',
            },
          },
        ],
      },
    ],
  },
} satisfies Record<Locale, LeadershipContent>;
