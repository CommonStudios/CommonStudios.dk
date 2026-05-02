import type { Locale } from './constants';

type UiForLocale = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    projectsTitle: string;
    projectsDescription: string;
    privacyTitle: string;
    privacyDescription: string;
  };
  skipToContent: string;
  header: {
    brandAria: string;
    projects: string;
    contact: string;
    navPrimary: string;
    chooseLanguage: string;
  };
  footer: {
    contact: string;
    navigation: string;
    social: string;
    projects: string;
    privacy: string;
    copenhagen: string;
    footerNav: string;
    socialMedia: string;
  };
  home: {
    heroAria: string;
    heroTitle: string;
    /** Lines cycled by the hero typewriter (first matches heroTitle for SEO copy). */
    heroTypingLines: readonly string[];
    heroLede: string;
    heroActionsAria: string;
    heroCta: string;
    heroCreditLead: string;
    heroCreditTail: string;
  };
  projects: {
    introAria: string;
    eyebrow: string;
    title: string;
    lede: string;
    listAria: string;
    imageWindowTitle: string;
    linksNavSuffix: string;
  };
  privacy: {
    backHome: string;
    eyebrow: string;
    docMarker: string;
    title: string;
    sectionAria: string;
  };
  notFound: {
    title: string;
    eyebrow: string;
    headline1: string;
    headline2: string;
    lede: string;
    ctaHome: string;
    ctaWork: string;
  };
  common: {
    closeImagePreview: string;
  };
};

const en: UiForLocale = {
  meta: {
    homeTitle: 'Tyndfed — Independent software development studio',
    homeDescription:
      'Tyndfed is an independent Copenhagen studio for software development, websites, web apps, and digital systems.',
    projectsTitle: 'Tyndfed — Projects',
    projectsDescription:
      'Tyndfed projects: software, websites, web apps, and digital systems — work built to ship and last.',
    privacyTitle: 'Tyndfed — Privacy & Terms',
    privacyDescription:
      'Privacy Policy and Terms of Service for Tyndfed apps and services.',
  },
  skipToContent: 'Skip to content',
  header: {
    brandAria: 'Tyndfed — back to home',
    projects: 'Projects',
    contact: 'Contact',
    navPrimary: 'Primary',
    chooseLanguage: 'Language',
  },
  footer: {
    contact: 'Contact',
    navigation: 'Navigation',
    social: 'Social',
    projects: 'Projects',
    privacy: 'Privacy',
    copenhagen: 'Copenhagen, Denmark',
    footerNav: 'Footer navigation',
    socialMedia: 'Social media',
  },
  home: {
    heroAria: 'Hero',
    heroTitle: 'Work that reads clearly.',
    heroTypingLines: [
      'Work that reads clearly.',
      'Software that ships cleanly.',
      'Web apps with less friction.',
      'Interfaces built to last.',
    ],
    heroLede:
      'Independent software studio for websites, web apps, internal tools, and digital systems — for clients who care how things work, read, and hold up.',
    heroActionsAria: 'Hero actions',
    heroCta: 'View selected work',
    heroCreditLead: 'By ',
    heroCreditTail: ' — software development and web systems, from Copenhagen.',
  },
  projects: {
    introAria: 'Projects intro',
    eyebrow: 'Tyndfed · Projects',
    title: 'Built to be used',
    lede: 'Websites, web apps, product interfaces, and digital systems — work made to read clearly, load fast, and hold up once it’s in the wild.',
    listAria: 'Project list',
    imageWindowTitle: 'Logo preview',
    linksNavSuffix: 'links',
  },
  privacy: {
    backHome: 'Back to home',
    eyebrow: 'Legal',
    docMarker: 'N°3',
    title: 'Privacy & Terms',
    sectionAria: 'Legal content',
  },
  notFound: {
    title: '404 — Page not found · Tyndfed',
    eyebrow: '404 — Page not found',
    headline1: 'Lost in',
    headline2: 'transit.',
    lede: "The page you were looking for doesn't exist, has moved, or never made it past the cutting room floor.",
    ctaHome: 'Back to home',
    ctaWork: 'See selected work',
  },
  common: {
    closeImagePreview: 'Close image preview',
  },
};

const da: UiForLocale = {
  meta: {
    homeTitle: 'Tyndfed — Uafhængigt studio til softwareudvikling',
    homeDescription:
      'Tyndfed er et uafhængigt Københavns-studio til softwareudvikling, websites, webapps og digitale systemer.',
    projectsTitle: 'Tyndfed — Projekter',
    projectsDescription:
      'Udvalgte projekter fra Tyndfed: software, websites, webapps og digitale systemer — bygget til at blive brugt.',
    privacyTitle: 'Tyndfed — Privatliv & vilkår',
    privacyDescription:
      'Privatlivspolitik og servicevilkår for Tyndfeds apps og tjenester.',
  },
  skipToContent: 'Spring til indhold',
  header: {
    brandAria: 'Tyndfed — tilbage til forsiden',
    projects: 'Projekter',
    contact: 'Kontakt',
    navPrimary: 'Primær',
    chooseLanguage: 'Sprog',
  },
  footer: {
    contact: 'Kontakt',
    navigation: 'Navigation',
    social: 'Socialt',
    projects: 'Projekter',
    privacy: 'Privatliv',
    copenhagen: 'København, Danmark',
    footerNav: 'Footer-navigation',
    socialMedia: 'Sociale medier',
  },
  home: {
    heroAria: 'Forside',
    heroTitle: 'Arbejde, der står skarpt.',
    heroTypingLines: [
      'Arbejde, der står skarpt.',
      'Software, der leverer.',
      'Webapps uden friktion.',
      'Interfaces bygget til drift.',
    ],
    heroLede:
      'Uafhængigt softwarestudio til websites, webapps, interne værktøjer og digitale systemer — med omtanke for hvordan det virker, læses og holder.',
    heroActionsAria: 'Handlinger',
    heroCta: 'Se udvalgte projekter',
    heroCreditLead: 'Af ',
    heroCreditTail: ' — softwareudvikling og websystemer fra København.',
  },
  projects: {
    introAria: 'Projektoversigt',
    eyebrow: 'Tyndfed · Projekter',
    title: 'Skabt til at blive brugt',
    lede: 'Websites, webapps, produktinterfaces og digitale systemer — arbejde, der er let at læse, hurtigt at indlæse, og som holder, når det er ude.',
    listAria: 'Projektliste',
    imageWindowTitle: 'Logo forhåndsvisning',
    linksNavSuffix: 'henvisninger',
  },
  privacy: {
    backHome: 'Tilbage til forsiden',
    eyebrow: 'Jura',
    docMarker: 'N°3',
    title: 'Privatliv & vilkår',
    sectionAria: 'Juridisk indhold',
  },
  notFound: {
    title: '404 — Siden findes ikke · Tyndfed',
    eyebrow: '404 — Siden findes ikke',
    headline1: 'Væk i',
    headline2: 'systemet.',
    lede: 'Siden findes ikke, er flyttet, eller nåede aldrig ud over idéstadiet.',
    ctaHome: 'Tilbage til forsiden',
    ctaWork: 'Se udvalgte projekter',
  },
  common: {
    closeImagePreview: 'Luk forhåndsvisning',
  },
};

const byLocale: Record<Locale, UiForLocale> = { da, en };

export function ui(locale: Locale): UiForLocale {
  return byLocale[locale];
}
