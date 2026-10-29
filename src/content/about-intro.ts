import type { Locale } from '../i18n/ui';

interface Activity {
  id: 'video' | 'photo';
  title: string;
  description: string;
  action: string;
  href: string;
}

interface AboutIntro {
  eyebrow: string;
  action: string;
  activitiesTitle: string;
  activities: Activity[];
}

// Redesign autorizado em 15/10/2026; os destinos dos canais são preservados.
export const aboutIntroContent = {
  pt: {
    eyebrow: 'C4AI — USP',
    action: 'Conheça nossas pesquisas',
    activitiesTitle: 'Acompanhe nossas atividades',
    activities: [
      {
        id: 'video',
        title: 'Seminários e palestras',
        description:
          'Assista às apresentações e aos encontros promovidos pelo C4AI.',
        action: 'Acessar YouTube',
        href: 'https://www.youtube.com/c/C4AIUSP',
      },
      {
        id: 'photo',
        title: 'Eventos e workshops',
        description:
          'Explore os registros fotográficos das atividades do centro.',
        action: 'Acessar Flickr',
        href: 'https://www.flickr.com/photos/195298871@N06/52014132992/in/album-72177720298226753',
      },
    ],
  },
  en: {
    eyebrow: 'C4AI — USP',
    action: 'Explore our research',
    activitiesTitle: 'Follow our activities',
    activities: [
      {
        id: 'video',
        title: 'Seminars and talks',
        description: 'Watch presentations and meetings organized by C4AI.',
        action: 'Visit YouTube',
        href: 'https://www.youtube.com/c/C4AIUSP',
      },
      {
        id: 'photo',
        title: 'Events and workshops',
        description: 'Explore photographs of the center’s activities.',
        action: 'Visit Flickr',
        href: 'https://www.flickr.com/photos/195298871@N06/52014132992/in/album-72177720298226753',
      },
    ],
  },
} satisfies Record<Locale, AboutIntro>;
