/**
 * Single source of truth for deploy URL and marketing constants.
 * Imported by Astro config (build-time) and layouts (SSR).
 */
export const SITE_ORIGIN = 'https://tyndfed.dk' as const;

/** Favicon + Ascii fallback SVG — safe to preload on every route. */
export const BRAND_MARK_SRC = '/images/tyndfed.svg' as const;

export const SEO = {
  defaultDescription:
    'Tyndfed - Independent software development studio specializing in websites, web apps, and digital systems.',
  defaultOgImage: '/images/og-image.png',
  siteName: 'Tyndfed',
  themeColor: '#0b0c0a',
  author: 'Tobias Dosdal-Feddersen',
} as const;

export const ORGANIZATION = {
  jsonLdType: ['Organization', 'ProfessionalService'] as const,
  name: 'Tyndfed',
  description: 'Software development, websites, web apps, and digital systems',
  logoPath: BRAND_MARK_SRC,
  addressLocality: 'Copenhagen',
  addressCountry: 'DK',
  priceRange: '$$',
  sameAs: [
    'https://github.com/tobiasdosdal',
    'https://www.linkedin.com/in/tobias-dosdal-feddersen/',
    'https://instagram.com/tobiasdosdal',
  ] as const,
} as const;

export function buildOrganizationJsonLd(siteOrigin: string) {
  const origin = siteOrigin.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': ORGANIZATION.jsonLdType,
    name: ORGANIZATION.name,
    url: origin,
    logo: `${origin}${ORGANIZATION.logoPath}`,
    description: ORGANIZATION.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORGANIZATION.addressLocality,
      addressCountry: ORGANIZATION.addressCountry,
    },
    priceRange: ORGANIZATION.priceRange,
    sameAs: [...ORGANIZATION.sameAs],
    areaServed: {
      '@type': 'City',
      name: ORGANIZATION.addressLocality,
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website design and development',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web application and internal tool development',
        },
      },
    ],
  } as const;
}
