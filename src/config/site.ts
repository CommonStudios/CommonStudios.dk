/**
 * Single source of truth for deploy URL and marketing constants.
 * Imported by Astro config (build-time) and layouts (SSR).
 */
export const SITE_ORIGIN = 'https://commonstudios.dk' as const;

export const FAVICON_SRC = '/favicon.svg' as const;
export const APPLE_TOUCH_ICON_SRC = '/apple-touch-icon.png' as const;
/** Square raster logo for search engines (Organization `logo` wants ≥112px raster). */
export const LOGO_PNG_SRC = '/images/logo-512.png' as const;

export const CONTACT = {
  email: 'kontakt@tobiasdosdal.dk',
  registrationNumber: '39125307',
} as const;

export const SOCIAL_URLS = {
  github: 'https://github.com/CommonStudios',
  linkedin: 'https://www.linkedin.com/in/tobias-dosdal-feddersen/',
  instagram: 'https://instagram.com/tobiasdosdal',
} as const;

export const SEO = {
  defaultDescription:
    'CommonStudios builds websites, web apps and AI solutions for businesses from Copenhagen.',
  defaultOgImage: '/images/og-image.png',
  siteName: 'CommonStudios',
  themeColor: '#111312',
  author: 'Tobias Dosdal-Feddersen',
} as const;

const SERVICES = [
  'Website design and development',
  'Web application development',
  'AI integration and automation',
  'Internal tool development',
] as const;

/** Schema.org graph shared by every indexable page. */
export function buildJsonLd(siteOrigin: string, inLanguage: string) {
  const origin = siteOrigin.replace(/\/$/, '');
  const orgId = `${origin}/#organization`;
  const personId = `${origin}/#founder`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': orgId,
        name: SEO.siteName,
        url: origin,
        logo: `${origin}${LOGO_PNG_SRC}`,
        image: `${origin}${SEO.defaultOgImage}`,
        description: SEO.defaultDescription,
        email: CONTACT.email,
        vatID: `DK${CONTACT.registrationNumber}`,
        founder: { '@id': personId },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'København',
          addressCountry: 'DK',
        },
        areaServed: { '@type': 'Country', name: 'Denmark' },
        knowsLanguage: ['da', 'en'],
        sameAs: Object.values(SOCIAL_URLS),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: SERVICES.map((name) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: SEO.author,
        jobTitle: 'Software developer and designer',
        worksFor: { '@id': orgId },
        sameAs: [SOCIAL_URLS.linkedin, SOCIAL_URLS.github],
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: SEO.siteName,
        inLanguage,
        publisher: { '@id': orgId },
      },
    ],
  } as const;
}
