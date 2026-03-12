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
    name: 'Bodegalisten',
    description: 'Fællesskabsdrevet platform med over 500 danske bodegaer. Brugerratings, anmeldelser og kortfunktion på tværs af iOS-app og responsive webapp.',
    icon: '/images/project-icons/Icon-83.5@2x.png',
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/dk/app/bodegalisten/id6476145936' },
      { label: 'Web', url: 'https://bodegalisten.dk' },
    ],
  },
  {
    name: 'Baobab-kommunikation.dk',
    description: 'Skræddersyet hjemmeside til kommunikationsbureau med fokus på hurtig indlæsning, tilgængelighed og en visuel identitet der afspejler deres brand.',
    icon: '/images/project-icons/baobab-logo.jpg',
    links: [{ label: 'Web', url: 'https://web.archive.org/web/20250403102638/https://www.baobab-kommunikation.dk/' }],
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
