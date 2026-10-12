import { type Project, parseProjects } from '~/schemas/projects';

export type { Project };

/**
 * Content seed — validated at module load so bad deploys fail the build.
 */
const PROJECTS_SEED = [
  {
    name: 'monoplan',
    description: {
      da: 'Vagtplansystem, der samler vagtplan, teamchat, tidsregistrering og løntimer ét sted for danske arbejdspladser med skiftende arbejdstider.',
      en: 'Workforce scheduling platform that brings shift planning, team chat, time tracking and payroll hours together for Danish workplaces with changing schedules.',
    },
    url: 'https://monoplan.dk',
    icon: '/images/project-icons/monoplan-icon-dark.svg',
  },
  {
    name: 'Andelsbasen',
    description: {
      da: 'Dataplatform med Danmarks mest komplette oversigt over andelsboligforeninger. Information om ventelister, priser, boligantal og kontaktoplysninger for over 11.000 foreninger.',
      en: 'Data platform with Denmark’s most complete index of housing co-ops. Waitlists, prices, unit counts and contact details for more than 11,000 associations.',
    },
    url: 'https://andelsbasen.dk',
    icon: '/images/project-icons/andelsbasen-mark.svg',
  },
  {
    name: 'EXS Nordic',
    description: {
      da: 'Logo til dansk kaffevirksomhed med kunder i hele Norden.',
      en: 'Logo for a Danish coffee company with customers across the Nordics.',
    },
    url: 'https://exsnordic.com',
    preview: {
      src: '/images/exsnordic-logo-1200.png',
      width: 1200,
      height: 203,
      alt: { da: 'EXS Nordic-logoet', en: 'The EXS Nordic logo' },
    },
  },
] as const;

export const projects: Project[] = parseProjects(PROJECTS_SEED);
