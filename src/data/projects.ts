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
    description:
      'Dataplatform med Danmarks mest komplette oversigt over andelsboligforeninger. Information om ventelister, priser, boligantal og kontaktoplysninger for 12.000+ foreninger.',
    icon: '/images/project-icons/andelsbasen-icon.svg',
    links: [{ label: 'Web', url: 'https://andelsbasen.dk' }],
  },
  {
    name: 'PL Showet',
    description:
      'Komplet videoproduktion for Premier League-podcast med ugentlige episoder, grafik og distribution på Youtube og Spotify.',
    icon: '/images/project-icons/pllogo.png',
    links: [{ label: 'Youtube', url: 'https://www.youtube.com/@PLShowet' }],
  },
  {
    name: 'EXS Nordic',
    description: 'Logo til dansk kaffevirksomhed med kunder i hele Norden.',
    icon: '/images/project-icons/exs-icon.png',
    links: [
      { label: 'Web', url: 'https://exsnordic.com' },
      { label: 'Logo (hvid)', url: '/images/exsnordic-logo.png' },
      { label: 'Logo (sort)', url: '/images/exsnordic-logo-black.png' },
    ],
  },
  {
    name: 'WOW-FIT',
    description:
      'Hjemmeside og logo til personlig træner og kostvejleder i Kastrup.',
    icon: '/images/project-icons/wowfit-icon.png',
    links: [{ label: 'Web', url: 'https://wow-fit.dk' }],
  },
] as const;

export const projects: Project[] = parseProjects(PROJECTS_SEED);
