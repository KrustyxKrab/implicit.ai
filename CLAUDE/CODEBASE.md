# CODEBASE.md — implicit.ai live map

> **Keep this file up to date.** Any time you add, remove, or rename a file — update this map.
> Last updated: 2026-04-21

---

## Repository Layout

```
Website/
├── CLAUDE.md                    ← agent entry point (read first)
├── CLAUDE/
│   ├── IDEA.md                  ← full product concept brief
│   ├── PLAN.md                  ← design decisions, principles, original plan
│   └── CODEBASE.md              ← this file
└── implicit/                    ← Astro website (all code lives here)
    ├── package.json
    ├── astro.config.mjs
    ├── tsconfig.json
    ├── public/                  ← static assets (favicon, images)
    └── src/
        ├── styles/
        │   └── design.css       ← ALL design tokens — edit here, nowhere else
        ├── layouts/
        │   └── Layout.astro     ← root shell: meta/SEO, Inter font, global CSS
        ├── components/
        │   ├── Nav.astro        ← sticky nav, logo wordmark, lang toggle, CTA
        │   ├── Hero.astro       ← full-viewport, 64px headline, fade-up anim
        │   ├── HowItWorks.astro ← 01/02/03 numbered steps (3-col grid)
        │   ├── TheProblem.astro ← 2-col Kodak framing (signal + aggregation)
        │   ├── ValidationLoop.astro ← 5-stage Extract→Converge card flow
        │   ├── USP.astro        ← strikethrough "not this" vs bold "this"
        │   ├── DemoCTA.astro    ← founder avatar, deliverables list, mailto CTA
        │   └── Footer.astro     ← legal links + copyright year (dynamic)
        └── pages/
            ├── index.astro      ← EN landing (composes all components)
            ├── imprint.astro    ← Impressum (§5 TMG, DE + EN) ⚠ placeholders
            ├── privacy.astro    ← GDPR Datenschutzerklärung (DE + EN) ⚠ placeholders
            ├── terms.astro      ← Terms of Service (EN only)
            └── de/
                └── index.astro  ← DE landing (same components, lang="de")
```

---

## Component Props Reference

Every component accepts `lang?: 'en' | 'de'` (default `'en'`). No other external props unless noted.

| Component | Key behaviour |
|-----------|--------------|
| `Nav.astro` | `lang` toggles CTA label + EN↔DE link href |
| `Hero.astro` | Fade-up CSS animation on load (disabled via `prefers-reduced-motion`) |
| `HowItWorks.astro` | Steps array defined inside frontmatter, bilingual |
| `TheProblem.astro` | Inline ternary for all copy; single CTA at bottom |
| `ValidationLoop.astro` | Stages array in frontmatter; arrow separators hidden on mobile |
| `USP.astro` | Strikethrough on "not" statement; accent divider between blocks |
| `DemoCTA.astro` | Deliverables array in frontmatter; CTA links to `mailto:hello@implicit.ai` |
| `Footer.astro` | Copyright year is `new Date().getFullYear()` — always current |
| `Layout.astro` | Props: `title`, `description`, `lang` — all optional with sensible defaults |

---

## Pages Reference

| Route | File | Notes |
|-------|------|-------|
| `/` | `pages/index.astro` | EN, composes all components |
| `/de/` | `pages/de/index.astro` | DE, same components with `lang="de"` |
| `/imprint` | `pages/imprint.astro` | DE + EN; ⚠ address/VAT placeholders |
| `/privacy` | `pages/privacy.astro` | DE + EN; ⚠ address/VAT placeholders |
| `/terms` | `pages/terms.astro` | EN only; ⚠ city placeholder in governing law clause |

---

## Scroll Animations

`.section-fade` class is used on elements that should animate in on scroll.
The Intersection Observer script is inline in `index.astro` and `de/index.astro`.
`prefers-reduced-motion` disables all transitions via global CSS rule in both pages.

---

## i18n Pattern

No routing library. Convention:
- `/` → English
- `/de/` → German
- Nav lang toggle switches between the two roots
- Legal pages are bilingual within a single page (DE section first, EN below)
- All component strings use inline ternary: `lang === 'de' ? '...' : '...'`

---

## Build

```bash
cd implicit
npm run dev      # dev server
npm run build    # production build → dist/
npm run preview  # preview production build
```

Build must pass cleanly (zero errors/warnings) before marking any issue Done.

---

## Linear Issues Status (as of 2026-04-22)

All 25 issues in the `implicit.ai` project are **Done**.

| ID | Title | Status |
|----|-------|--------|
| WHY-5 | Setup Astro project structure + design.css | ✅ Done |
| WHY-6 | Setup CODEBASE.md live map | ✅ Done |
| WHY-7 | Production build check + SEO meta | ✅ Done |
| WHY-8 | Build Nav.astro | ✅ Done |
| WHY-9 | Build Hero.astro | ✅ Done |
| WHY-10 | Build HowItWorks.astro | ✅ Done |
| WHY-11 | Build TheProblem.astro | ✅ Done |
| WHY-12 | Build ValidationLoop.astro | ✅ Done |
| WHY-13 | Build USP.astro | ✅ Done |
| WHY-14 | Build DemoCTA.astro | ✅ Done |
| WHY-15 | Build Footer.astro | ✅ Done |
| WHY-16 | Scroll animations | ✅ Done |
| WHY-17 | i18n EN/DE toggle | ✅ Done |
| WHY-18 | Build /imprint | ✅ Done |
| WHY-19 | Build /privacy | ✅ Done |
| WHY-20 | Build /terms | ✅ Done |
| WHY-21 | Redesign: Light mode + 21st.dev component system | ✅ Done |
| WHY-22 | Update design tokens to light mode | ✅ Done |
| WHY-29 | Design Token Overhaul: Dual-Polarity Dark/Light Theme System | ✅ Done |
| WHY-30 | Nav: Hyper-minimal sticky header with theme toggle | ✅ Done |
| WHY-31 | Hero: 96px headline, macro whitespace, brutalist CTAs | ✅ Done |
| WHY-32 | HowItWorks: Bento grid, sharp edges, brutalist mockups | ✅ Done |
| WHY-33 | ValidationLoop + TheProblem: Brutalist card layouts | ✅ Done |
| WHY-34 | USP + DemoCTA + Footer: Match brutalist aesthetic | ✅ Done |
| WHY-35 | Motion: Spring-physics easing + hover micro-interactions | ✅ Done |

## Theme System (added 2026-04-22)

The site now supports **Dual-Polarity** themes:
- **Dark (The Void)** — default: `#0a0a0a` bg, white text, `rgba(255,255,255,0.08)` borders
- **Light (The Lab)** — `[data-theme="light"]`: `#ffffff` bg, black text, `rgba(0,0,0,0.08)` borders
- Toggle button in Nav persists choice to `localStorage`
- FOUC prevented by inline script in `Layout.astro` `<head>`
- All CTAs use `--color-cta-bg` / `--color-cta-text` tokens (monochromatic inversion per theme)
