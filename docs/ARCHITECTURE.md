# Tyndfed — architecture notes

Small static site, **over-engineered on purpose** to show how a senior front-end engineer structures edge cases, content safety, and build hygiene without shipping a second application to users.

## Layers

| Layer | Responsibility |
|--------|----------------|
| `src/config/site.ts` | Deploy URL, canonical URLs, SEO defaults, JSON-LD inputs, font URLs. Astro `site` reads the same origin to avoid config drift. |
| `src/schemas/` | Zod parsers — **fail the build** when content shape is wrong. |
| `src/data/` | Seeds only; exports are always parsed. |
| `src/constants/` | UI rules that are not “data” (e.g. which project link opens the lightbox). |
| `src/lib/` | Pure utilities (`urls`, `invariant`, `assertNever`). |

## Runtime vs build

- **Astro + static output**: all validation that imports Zod runs at **build time** only. No Zod in the browser bundle for pages that only use static data.
- **Islands** (React): keep heavy client logic isolated; config is not imported into `ColorBends` / GSAP paths.

## Tooling

- `astro check` — template + TS diagnostics.
- `biome check` — format + lint for TS/JS/config (`.astro` opt-out; templates stay Astro-native).
- `vitest` — unit tests for parsers and URL helpers (cheap regression net).

## Adding a project

1. Append to `PROJECTS_SEED` in `src/data/projects.ts`.
2. Run `bun run build` — Zod will reject bad URLs (e.g. non-`/`-prefixed icons) or empty labels.

## CI

GitHub Actions runs install → check → lint → test → build on push/PR so broken content or types never reach `main`.

## Performance (high level)

- **Resource hints:** `preconnect` to font CDNs, `dns-prefetch` for Vercel vitals, `preload` for the brand SVG and (on `/projects`) the first two card icons with `fetchpriority="high"`.
- **Fonts:** JetBrains / Noto mono stylesheet stays render-blocking (matches critical CSS); Satoshi is loaded **non-blocking** (`media="print"` → `all` after load) to shorten the critical path; `noscript` fallback keeps fonts without JS.
- **Navigation:** `prefetch.defaultStrategy: 'viewport'` plus `data-astro-prefetch` on in-app links (hero CTA, back link) warms HTML for view transitions.
- **Third party:** Speed Insights uses `client:idle` so main-thread work defers to idle.
- **Edge:** HTML routes get `stale-while-revalidate` on Vercel; hashed assets under `/_astro/` stay long-cache immutable.
