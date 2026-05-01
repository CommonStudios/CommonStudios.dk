/**
 * Single source of truth for deploy URL and marketing constants.
 * Imported by Astro config (build-time) and layouts (SSR).
 */
export const SITE_ORIGIN = 'https://tyndfed.dk' as const;

export const ROUTES = {
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
  themeColor: '#0a0a09',
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

/** External font stylesheet URLs — deduped here so prefetch/preload stay aligned. */
export const FONT_STYLESHEETS = {
  primary:
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,30..100&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
} as const;

/** Origins we warm-connect to from `<head>`. */
export const FONT_PRECONNECT = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
] as const;

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
