/**
 * Single source of truth for deploy URL and marketing constants.
 * Imported by Astro config (build-time) and layouts (SSR).
 */
export const SITE_ORIGIN = 'https://tyndfed.dk' as const;

export const ROUTES = {
  /** @deprecated Use `pathForLocale` from `~/i18n/paths` for locale-prefixed links. */
  home: '/',
  projects: '/projects',
  privacy: '/privacy',
} as const;

export const CANONICAL = {
  home: `${SITE_ORIGIN}/`,
  projects: `${SITE_ORIGIN}${ROUTES.projects}`,
  privacy: `${SITE_ORIGIN}${ROUTES.privacy}`,
} as const;

/** Favicon + Ascii fallback SVG — safe to preload on every route. */
export const BRAND_MARK_SRC = '/images/tyndfed.svg' as const;

export const SEO = {
  defaultDescription:
    'Tyndfed - Creative development studio specializing in mobile apps, websites, and digital design.',
  defaultOgImage: BRAND_MARK_SRC,
  siteName: 'Tyndfed',
  themeColor: '#0b0c0a',
  author: 'Tobias Dosdal-Feddersen',
} as const;

export const ORGANIZATION = {
  jsonLdType: 'Organization' as const,
  name: 'Tyndfed',
  description: 'Software development & creative services',
  logoPath: BRAND_MARK_SRC,
  addressCountry: 'DK',
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
      addressCountry: ORGANIZATION.addressCountry,
    },
    sameAs: [...ORGANIZATION.sameAs],
  } as const;
}
