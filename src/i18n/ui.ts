import type { Locale } from './constants';

type UiForLocale = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    projectsTitle: string;
    projectsDescription: string;
    contactTitle: string;
    contactDescription: string;
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
  contact: {
    introAria: string;
    eyebrow: string;
    title: string;
    lede: string;
    formAria: string;
    name: string;
    email: string;
    projectType: string;
    budget: string;
    message: string;
    submit: string;
    directEmail: string;
    mailtoSubject: string;
    projectOptions: readonly string[];
    budgetOptions: readonly string[];
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
    homeTitle: 'Software Development Studio in Copenhagen | Tyndfed',
    homeDescription:
      'Copenhagen software studio building fast websites, useful web apps, and internal systems with clear interfaces and durable code.',
    projectsTitle: 'Selected Software Projects | Tyndfed',
    projectsDescription:
      'Selected Tyndfed projects across websites, web apps, product interfaces, and digital systems built to ship, load fast, and last.',
    contactTitle: 'Start a Project | Tyndfed',
    contactDescription:
      'Get in touch with Tyndfed about a website, web app, internal tool, interface, or identity project.',
    privacyTitle: 'Privacy & Terms | Tyndfed',
    privacyDescription:
      'Privacy Policy and Terms of Service for the Tyndfed studio website and client enquiries.',
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
    heroTitle: 'Software built with care in Copenhagen.',
    heroTypingLines: [
      'Software built with care in Copenhagen.',
      'Fast websites with a clear point.',
      'Web apps people can actually use.',
      'Internal tools that remove busywork.',
    ],
    heroLede:
      'Tyndfed designs and builds websites, web apps, and internal systems for teams that need clean interfaces, reliable delivery, and code that is still understandable later.',
    heroActionsAria: 'Hero actions',
    heroCta: 'View selected work',
    heroCreditLead: 'By ',
    heroCreditTail: ' — software design and development from Copenhagen.',
  },
  projects: {
    introAria: 'Projects intro',
    eyebrow: 'Tyndfed · Projects',
    title: 'Selected software projects',
    lede: 'Websites, web apps, product interfaces, and internal systems built to be clear on day one and maintainable after launch.',
    listAria: 'Project list',
    imageWindowTitle: 'Logo preview',
    linksNavSuffix: 'links',
  },
  contact: {
    introAria: 'Contact intro',
    eyebrow: 'Tyndfed · Contact',
    title: 'Start a project conversation',
    lede: 'Need a sharper website, a useful web app, or an internal tool that saves time? Send a few details and I will reply with the next practical step.',
    formAria: 'Contact form',
    name: 'Name',
    email: 'Email',
    projectType: 'Project type',
    budget: 'Budget',
    message: 'Message',
    submit: 'Open email draft',
    directEmail: 'Prefer your own inbox? Write to kontakt@tyndfed.dk.',
    mailtoSubject: 'Project enquiry from tyndfed.dk',
    projectOptions: [
      'Website',
      'Web app',
      'Internal tool',
      'UI/UX design',
      'Logo & identity',
      'Other',
    ],
    budgetOptions: [
      'Under 25,000 DKK',
      '25,000-50,000 DKK',
      '50,000-100,000 DKK',
      '100,000+ DKK',
      'Not sure yet',
    ],
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
    homeTitle: 'Softwareudvikling i København | Tyndfed',
    homeDescription:
      'Københavnsk softwarestudio, der bygger hurtige websites, brugbare webapps og interne systemer med klare interfaces og solid kode.',
    projectsTitle: 'Udvalgte softwareprojekter | Tyndfed',
    projectsDescription:
      'Udvalgte Tyndfed-projekter inden for websites, webapps, produktinterfaces og digitale systemer bygget til at blive brugt.',
    contactTitle: 'Start et projekt | Tyndfed',
    contactDescription:
      'Kontakt Tyndfed om et website, en webapp, et internt værktøj, interface eller identitetsprojekt.',
    privacyTitle: 'Privatliv & vilkår | Tyndfed',
    privacyDescription:
      'Privatlivspolitik og vilkår for Tyndfeds studiohjemmeside og kundehenvendelser.',
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
    heroTitle: 'Software bygget med omtanke i København.',
    heroTypingLines: [
      'Software bygget med omtanke i København.',
      'Hurtige websites med en klar retning.',
      'Webapps mennesker faktisk kan bruge.',
      'Interne værktøjer der fjerner travlhed.',
    ],
    heroLede:
      'Tyndfed designer og bygger websites, webapps og interne systemer til teams, der har brug for tydelige interfaces, sikker levering og kode, der stadig er til at forstå senere.',
    heroActionsAria: 'Handlinger',
    heroCta: 'Se udvalgte projekter',
    heroCreditLead: 'Af ',
    heroCreditTail: ' — softwaredesign og udvikling fra København.',
  },
  projects: {
    introAria: 'Projektoversigt',
    eyebrow: 'Tyndfed · Projekter',
    title: 'Udvalgte softwareprojekter',
    lede: 'Websites, webapps, produktinterfaces og interne systemer bygget til at være tydelige fra første dag og til at holde efter lancering.',
    listAria: 'Projektliste',
    imageWindowTitle: 'Logo forhåndsvisning',
    linksNavSuffix: 'henvisninger',
  },
  contact: {
    introAria: 'Kontaktintro',
    eyebrow: 'Tyndfed · Kontakt',
    title: 'Start en projektsamtale',
    lede: 'Har du brug for et skarpere website, en brugbar webapp eller et internt værktøj, der sparer tid? Send et par detaljer, så vender jeg tilbage med næste konkrete skridt.',
    formAria: 'Kontaktformular',
    name: 'Navn',
    email: 'Email',
    projectType: 'Projekttype',
    budget: 'Budget',
    message: 'Besked',
    submit: 'Åbn emailkladde',
    directEmail:
      'Foretrækker du din egen indbakke? Skriv til kontakt@tyndfed.dk.',
    mailtoSubject: 'Projektforespørgsel fra tyndfed.dk',
    projectOptions: [
      'Website',
      'Webapp',
      'Internt værktøj',
      'UI/UX-design',
      'Logo & identitet',
      'Andet',
    ],
    budgetOptions: [
      'Under 25.000 kr.',
      '25.000-50.000 kr.',
      '50.000-100.000 kr.',
      '100.000+ kr.',
      'Ikke afklaret endnu',
    ],
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
