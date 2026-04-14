# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tyndfed is a portfolio website built with Astro, React 19 (for interactive islands), and TypeScript. It uses static site generation and deploys to Vercel.

## Commands

```bash
bun install          # Install dependencies
bun dev              # Start dev server (port 4321)
bun run build        # Build for production
bun run preview      # Preview production build locally
```

## Architecture

**Stack:** Astro 6 + React 19 (islands) + TypeScript + Vercel adapter

**Routing:** File-based routing in `src/pages/`. The `404.astro` file is the error page.

**Key Files:**
- `src/layouts/BaseLayout.astro` - Root HTML layout with meta tags, fonts, JSON-LD
- `src/components/WindowChrome.astro` - macOS-style window wrapper (pure Astro, 0 JS)
- `src/components/AsciiLogo.tsx` - React island with glitch animation (`client:idle` on home)

**Key Patterns:**
- Astro components for static content (WindowChrome, pages)
- React islands only for interactive components (AsciiLogo with `client:idle` on home)
- SEO/meta tags handled via props in BaseLayout.astro
- Vanilla JS for simple interactivity (language toggle on privacy page)

**Styling:**
- Astro scoped styles in `.astro` files
- CSS modules only for React components (e.g., `AsciiLogo.module.css`)
- `src/styles/global.css` for global styles (variables, reset, body)
- Use kebab-case for class names in Astro components
- Dark theme only - CSS variables defined in `:root`

**Path Aliases:** `~/` maps to `src/`

**Engineering:** See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for config layers, Zod content validation, and CI. Root scripts: `lint`, `test`, `verify`.

## Design Review Workflow

Use `/design-review` command for comprehensive UI/UX review of front-end changes.

**When to trigger design review:**
- After completing significant UI changes
- Before creating PRs with visual components
- When accessibility or responsiveness testing is needed

**Design resources:**
- `.claude/design-principles.md` - Design tokens, patterns, and checklist
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
