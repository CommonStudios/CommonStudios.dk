import {
  type Project,
  type ProjectLink,
  parseProjects,
} from '~/schemas/projects';

export type { Project, ProjectLink };

/**
 * Content seed — validated at module load so bad deploys fail the build.
 */
const PROJECTS_SEED = [
  {
    name: 'Andelsbasen',
    description: {
      da: 'Dataplatform med Danmarks mest komplette oversigt over andelsboligforeninger. Information om ventelister, priser, boligantal og kontaktoplysninger for 12.000+ foreninger.',
      en: 'Data platform with Denmark’s most complete index of housing co-ops. Waitlists, prices, unit counts and contact details for 12,000+ associations.',
    },
    icon: '/images/project-icons/andelsbasen-icon.svg',
    links: [{ label: { da: 'Web', en: 'Web' }, url: 'https://andelsbasen.dk' }],
  },
  {
    name: 'PL Showet',
    description: {
      da: 'Komplet videoproduktion for Premier League-podcast med ugentlige episoder, grafik og distribution på Youtube og Spotify.',
      en: 'End-to-end video production for a Premier League podcast — weekly episodes, motion graphics, and distribution across YouTube and Spotify.',
    },
    icon: '/images/project-icons/pllogo.png',
    links: [
      {
        label: { da: 'Youtube', en: 'YouTube' },
        url: 'https://www.youtube.com/@PLShowet',
      },
    ],
  },
  {
    name: 'EXS Nordic',
    description: {
      da: 'Logo til dansk kaffevirksomhed med kunder i hele Norden.',
      en: 'Logo for a Danish coffee company with customers across the Nordics.',
    },
    icon: '/images/project-icons/exs-icon.png',
    links: [
      { label: { da: 'Web', en: 'Web' }, url: 'https://exsnordic.com' },
      {
        label: { da: 'Logo (hvid)', en: 'Logo (white)' },
        url: '/images/exsnordic-logo.png',
      },
      {
        label: { da: 'Logo (sort)', en: 'Logo (black)' },
        url: '/images/exsnordic-logo-black.png',
      },
    ],
  },
  {
    name: 'WOW-FIT',
    description: {
      da: 'Hjemmeside og logo til personlig træner og kostvejleder i Kastrup.',
      en: 'Website and logo for a personal trainer and nutrition coach in Kastrup.',
    },
    icon: '/images/project-icons/wowfit-icon.png',
    links: [{ label: { da: 'Web', en: 'Web' }, url: 'https://wow-fit.dk' }],
  },
] as const;

export const projects: Project[] = parseProjects(PROJECTS_SEED);
