import type { Locale } from './constants';

type Service = { title: string; text: string };

type UiForLocale = {
  meta: {
    homeTitle: string;
    homeDescription: string;
    privacyTitle: string;
    privacyDescription: string;
  };
  skipToContent: string;
  nav: {
    label: string;
    home: string;
    work: string;
    contact: string;
    /** Name of the *other* language, written in that language. */
    otherLanguage: string;
  };
  home: {
    title: string;
    intro: string;
    workHeading: string;
    servicesHeading: string;
    services: readonly Service[];
    contactHeading: string;
    contactText: string;
    copyEmail: string;
    copiedEmail: string;
  };
  footer: {
    location: string;
    privacy: string;
    social: string;
  };
  privacy: {
    title: string;
  };
  notFound: {
    title: string;
    heading: string;
    text: string;
    home: string;
  };
};

const en: UiForLocale = {
  meta: {
    homeTitle: 'Web development and AI solutions in Copenhagen | CommonStudios',
    homeDescription:
      'CommonStudios builds websites, web apps and AI solutions for businesses. A Copenhagen software studio focused on quality, performance and long-term maintenance.',
    privacyTitle: 'Privacy and terms | CommonStudios',
    privacyDescription:
      'How CommonStudios handles personal data from this website and client enquiries, and the terms for using the site.',
  },
  skipToContent: 'Skip to content',
  nav: {
    label: 'Main',
    home: 'CommonStudios, front page',
    work: 'Work',
    contact: 'Contact',
    otherLanguage: 'Dansk',
  },
  home: {
    title: 'We build websites, web apps and AI solutions for businesses.',
    intro:
      'CommonStudios is a software studio in Copenhagen. We help businesses build digital products and put AI to work where it makes a difference: in customer service, internal workflows and the products your customers use.',
    workHeading: 'Selected work',
    servicesHeading: 'Services',
    services: [
      {
        title: 'Websites',
        text: 'Fast, well-designed websites that are easy to find on Google and in AI search tools like ChatGPT.',
      },
      {
        title: 'Web apps',
        text: 'Custom web applications and platforms, from the first prototype to operation and further development.',
      },
      {
        title: 'AI solutions',
        text: 'Language models integrated into your products and workflows, such as assistants, document processing and automated handling of enquiries.',
      },
      {
        title: 'Internal tools',
        text: 'Systems that automate manual processes and bring your data together, so your team spends less time on routine work.',
      },
    ],
    contactHeading: 'Have a project in mind?',
    contactText:
      'Tell us briefly about your needs and timeline, and we’ll get back to you with a suggested next step.',
    copyEmail: 'Copy address',
    copiedEmail: 'Copied',
  },
  footer: {
    location: 'Copenhagen, Denmark',
    privacy: 'Privacy and terms',
    social: 'Elsewhere',
  },
  privacy: {
    title: 'Privacy and terms',
  },
  notFound: {
    title: 'Page not found | CommonStudios',
    heading: 'This page doesn’t exist.',
    text: 'It may have moved, or the link has a typo.',
    home: 'Go to the front page',
  },
};

const da: UiForLocale = {
  meta: {
    homeTitle: 'Webudvikling og AI-løsninger i København | CommonStudios',
    homeDescription:
      'CommonStudios udvikler websites, webapps og AI-løsninger til virksomheder. Et softwarestudie i København med fokus på kvalitet, hastighed og langsigtet drift.',
    privacyTitle: 'Privatliv og vilkår | CommonStudios',
    privacyDescription:
      'Sådan behandler CommonStudios personoplysninger fra hjemmesiden og kundehenvendelser, og vilkårene for at bruge siden.',
  },
  skipToContent: 'Spring til indhold',
  nav: {
    label: 'Hovedmenu',
    home: 'CommonStudios, forsiden',
    work: 'Projekter',
    contact: 'Kontakt',
    otherLanguage: 'English',
  },
  home: {
    title: 'Vi udvikler websites, webapps og AI-løsninger til virksomheder.',
    intro:
      'CommonStudios er et softwarestudie i København. Vi hjælper virksomheder med at bygge digitale produkter og tage AI i brug, hvor det gør en forskel: i kundeservice, i interne arbejdsgange og i de produkter, jeres kunder bruger.',
    workHeading: 'Udvalgte projekter',
    servicesHeading: 'Ydelser',
    services: [
      {
        title: 'Websites',
        text: 'Hurtige, veldesignede websites, der er nemme at finde på Google og i AI-søgninger som ChatGPT.',
      },
      {
        title: 'Webapps',
        text: 'Skræddersyede webapplikationer og platforme, fra første prototype til drift og videreudvikling.',
      },
      {
        title: 'AI-løsninger',
        text: 'Sprogmodeller integreret i jeres produkter og arbejdsgange, fx assistenter, dokumenthåndtering og automatisk behandling af henvendelser.',
      },
      {
        title: 'Interne værktøjer',
        text: 'Systemer, der automatiserer manuelle processer og samler jeres data, så teamet bruger mindre tid på rutineopgaver.',
      },
    ],
    contactHeading: 'Har I et projekt?',
    contactText:
      'Fortæl kort om jeres behov og tidsramme, så vender vi tilbage med et forslag til næste skridt.',
    copyEmail: 'Kopiér adresse',
    copiedEmail: 'Kopieret',
  },
  footer: {
    location: 'København, Danmark',
    privacy: 'Privatliv og vilkår',
    social: 'Andre steder',
  },
  privacy: {
    title: 'Privatliv og vilkår',
  },
  notFound: {
    title: 'Siden findes ikke | CommonStudios',
    heading: 'Siden findes ikke.',
    text: 'Den er måske flyttet, eller der er en tastefejl i linket.',
    home: 'Gå til forsiden',
  },
};

const byLocale: Record<Locale, UiForLocale> = { da, en };

export function ui(locale: Locale): UiForLocale {
  return byLocale[locale];
}
