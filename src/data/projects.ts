export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  name: string;
  description: string;
  icon: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    name: 'PL Showet',
    description: 'Komplet videoproduktion for Premier League-podcast med ugentlige episoder, grafik og distribution på Youtube og Spotify.',
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
    description: 'Hjemmeside og logo til personlig træner og kostvejleder i Kastrup.',
    icon: '/images/project-icons/wowfit-icon.png',
    links: [{ label: 'Web', url: 'https://wow-fit.dk' }],
  },
];
