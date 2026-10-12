# CommonStudios — architecture notes

Small static site, **over-engineered on purpose** to show how a senior front-end engineer structures edge cases, content safety, and build hygiene without shipping a second application to users.

## Layers

| Layer | Responsibility |
|--------|----------------|
| `src/config/site.ts` | Deploy URL, canonical URLs, SEO defaults, JSON-LD inputs, font URLs. Astro `site` reads the same origin to avoid config drift. |
| `src/schemas/` | Zod parsers — **fail the build** when content shape is wrong. |
| `src/data/` | Seeds only; exports are always parsed. |
| `src/lib/` | Pure utilities (`urls`). |
| `worker/` | Edge redirects: canonical host, language negotiation, merged-page 301s. |

## Runtime vs build

- **Astro + static output**: all validation that imports Zod runs at **build time** only. No Zod in the browser bundle for pages that only use static data.
- **No client framework.** The only scripts are the copy-email button and the language cookie.

## Tooling

- `astro check` — template + TS diagnostics.
- `biome check` — format + lint for TS/JS/config (`.astro` opt-out; templates stay Astro-native).
- `vitest` — unit tests for parsers and URL helpers (cheap regression net).

## Adding a project

1. Append to `PROJECTS_SEED` in `src/data/projects.ts`.
2. Run `npm run build` — Zod will reject bad URLs (e.g. non-`/`-prefixed icons) or empty labels.

## CI

GitHub Actions runs install → check → lint → test → build on push/PR so broken content or types never reach `main`.

## Performance (high level)

- **Fonts:** One self-hosted variable woff2 (Schibsted Grotesk, latin), preloaded, with a metric-matched Arial fallback.
- **No background imagery or motion.** The page is text plus one lazy-loaded logo.
- **Edge:** Cloudflare Workers serves the static build and handles redirects before asset lookup.
