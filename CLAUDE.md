# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CommonStudios is the bilingual (da/en) portfolio site for Tobias Dosdal-Feddersen's studio, built with Astro and TypeScript. Static output, served by a Cloudflare Worker with static assets.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 4321)
npm run build        # Build for production
npm run verify       # astro check + biome + vitest + build
```

## Architecture

**Pages:** `src/pages/[locale]/index.astro` is the whole site (intro, work, services, contact). `src/pages/[locale]/privacy.astro` holds the legal text. `404.astro` is bilingual. Unprefixed `/` and `/privacy` render `LocaleRedirect.astro` as a fallback only.

**Worker:** `worker/redirects.ts` handles redirects: `/` and `/privacy` go to the visitor's language (`lang` cookie, then Accept-Language, then da), and the old `/projects` and `/contact` pages 301 to `#work` and `#contact`.

**Content:** Projects live in `src/data/projects.ts` (validated by Zod). All UI copy is in `src/i18n/ui.ts`.

**SEO:** Built in `BaseLayout.astro`: canonical, hreflang, OG tags, and a JSON-LD `@graph` from `buildJsonLd` in `src/config/site.ts`. The sitemap comes from `@astrojs/sitemap`.

**Styling:**
- Tokens in `src/styles/global.css` (the "Patina" palette: oxide, slate, seam, paper, lichen, patina)
- One typeface: Nordwand Mono (self-hosted woff2 in `src/assets/fonts/`, OFL, from github.com/tywr/Nordwand-Mono)
- Astro scoped styles; kebab-case class names
- Dark theme only
- No Tailwind, no client framework; only small scripts (copy-email button, language cookie, ASCII wordmark scan)

**ASCII wordmark:** `src/components/AsciiLogo.astro` renders `src/assets/commonstudios-wordmark.json`, generated from `src/assets/commonstudios-wordmark.png` by `python3 scripts/ascii-wordmark.py` (needs Pillow, macOS fonts). Regenerate after changing the logo image.

**Path Aliases:** `~/` maps to `src/`

## Design Review Workflow

Use `/design-review` command for comprehensive UI/UX review of front-end changes.

**When to trigger design review:**
- After completing significant UI changes
- Before creating PRs with visual components
- When accessibility or responsiveness testing is needed

**Design resources:**
- `src/styles/global.css` - CSS variables and global styles

**Review process uses Playwright MCP to:**
1. Navigate to affected pages on localhost:4321
2. Test at multiple viewports (1440px, 768px, 375px)
3. Verify hover states and interactions
4. Check for console errors
5. Capture screenshots as evidence

**Post-implementation checklist:**
- [ ] Changes match design tokens (colors, spacing, typography)
- [ ] Responsive at all breakpoints
- [ ] Hover/focus states implemented
- [ ] No console errors
- [ ] Accessibility basics (contrast, focus visible, touch targets)
