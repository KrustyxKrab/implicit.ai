# implicit.ai — Agent Briefing

> **Read this file first. It is the single source of truth for any agent working in this repo.**
> Skim the Quick Reference, then jump to whichever section you need. Do not explore the codebase blind.

---

## Quick Reference

| What | Where |
|------|-------|
| Product concept (full) | `CLAUDE/IDEA.md` |
| Design decisions & principles | `CLAUDE/PLAN.md` |
| Live codebase map | `CLAUDE/CODEBASE.md` ← start here before touching any code |
| Linear project | [implicit.ai on Linear](https://linear.app/whyr-group/project/implicitai-9f3b6a4afc17) |
| Linear team | `Whyr group` (`WHY-*` prefix) |
| Website code | `/` |
| Design tokens | `/src/styles/design.css` |

---

## Product in One Paragraph

Implicit is an AI-guided interview service that surfaces inefficiencies, operational bottlenecks as well as hidden innovation potential inside large organisations. It runs a 5-stage Validation Loop: **Extract** (AI 1:1 interviews at scale) → **Synthesise** (cluster signals) → **Generate** (AI solution hypotheses) → **Validate** (workforce reacts to hypotheses) → **Converge** (pre-validated venture cases). The output is not a report — it is a living Knowledge Map of what the organisation knows but has never said out loud. Beachhead customer: HHLA (7,000 FTE, Hamburg port). Pilot price: €45–80k.

---

## Design System (do not deviate)

All tokens live in `/src/styles/design.css`. Never hardcode these values.

| Token | Value |
|-------|-------|
| `--color-bg` | `#0a0a0a` |
| `--color-surface` | `#111111` |
| `--color-border` | `#1f1f1f` |
| `--color-text-primary` | `#f5f5f5` |
| `--color-text-secondary` | `#888888` |
| `--color-accent` | `#f5a623` |
| `--color-accent-dark` | `#d4891a` |
| `--font-family` | Inter (Google Fonts) |
| `--max-width` | `1200px` |
| `--radius-ui` | `4px` |
| `--radius-card` | `8px` |

Type scale: `12 / 14 / 16 / 20 / 32 / 48 / 64px` via `--text-xs` through `--text-3xl`.
Spacing: multiples of 4px via `--space-1` through `--space-32`.

---

## Architecture

- **Framework:** Astro 6, static output
- **Styling:** scoped `<style>` per component + global tokens via `design.css`
- **i18n:** `lang` prop (`'en' | 'de'`) passed top-down. EN = `/`, DE = `/de/`. No external library.
- **Animations:** native Intersection Observer on `.section-fade` class. Respects `prefers-reduced-motion`.
- **No JS framework** — Astro islands only if needed in future.

---

## Process Rules (follow exactly)

# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

### Before writing any code
1. Read `CLAUDE/CODEBASE.md` — do not explore the file tree blind.
2. Check Linear (`WHY-*`) for the relevant issue. Move it to **In Progress** before starting.
3. If the task touches design: check `implicit/src/styles/design.css` first. Never add new tokens without updating that file.

### While working
- One component per file. Max ~200 lines per `.astro` file.
- All copy must exist in both `en` and `de` via inline ternary on the `lang` prop.
- No hardcoded hex values — use CSS custom properties from `design.css`.
- No external CSS libraries or UI kits. Write scoped styles.
- Keep `<style>` blocks scoped (default in Astro). Use `is:global` only for truly global rules.

### After writing code
1. Run `npm run build` inside `implicit/`. Fix any error before marking done.
2. Update `CLAUDE/CODEBASE.md` — add/remove any files you created or deleted.
3. Move the Linear issue to **Done**.
4. Commit: `feat: <short description>` / `fix: ...` / `chore: ...`

### Legal pages
The `/imprint` and `/privacy` pages contain **placeholder brackets** for real company details (address, VAT ID, responsible person). Do not invent real data. Flag to the user before go-live.

---

## Go-Live Checklist

Before the site goes live, these must be resolved:

- [ ] Fill real company details in `/imprint` and `/privacy` (address, VAT ID, responsible person name)
- [ ] Add real founder photo to `DemoCTA.astro`
- [ ] Add real logo (replace text wordmark in `Nav.astro`)
- [ ] Cookie consent banner (GDPR requirement)
- [ ] Sitemap + `robots.txt`
- [ ] Vercel / Netlify deployment config
- [ ] Analytics (Plausible recommended — privacy-first)
- [ ] `mailto:hello@implicit.ai` — verify the address exists

---

## Astro CSS Gotchas (known issues — read before touching component styles)

### 1. Absolutely positioned children need explicit `width`
`position: absolute` elements do **not** inherit their parent's width in Astro's layout. Always set `width: 100%` (or explicit `inset`/`left`/`right`) explicitly:
```css
/* WRONG — collapses to content-width */
.child { position: absolute; top: 0; left: 0; }

/* CORRECT */
.child { position: absolute; top: 0; left: 0; width: 100%; }
```

### 2. For JS-driven CSS transitions, set animated properties via inline styles — not class toggling
When JS controls an animation that needs the CSS `transition` to fire, set the animated properties (transform, opacity) **directly as inline styles**. Using a class toggle + `will-change` batches the old and new value into the same browser frame — the browser never sees a "before" value, so the transition never fires.

```js
/* WRONG — class toggle + will-change batches into one frame; transition doesn't fire */
el.classList.add('my-animated-state');

/* CORRECT — inline style gives the browser a clear before/after to transition between */
el.style.transform = 'translate(16px, 16px)';
el.style.opacity = '0.46';
```

The CSS `transition` property (defined on a class) still applies to inline-style changes — it governs HOW the property animates, regardless of what triggers the change. So define `transition` in CSS, set animated values via JS inline styles.

Class toggling is still correct for **boolean state** (visible/hidden, active/inactive) where no smooth transition is needed.

---

## Open Hypotheses (product, not website)

These are unvalidated assumptions in the business model — useful context for any copy decisions:

1. Do employees speak more openly to an AI agent than in classical formats?
2. Does the buyer land at Venture Builder/Strategy — or does HR intercept?
3. Are AI-generated hypotheses directionally useful enough for real validation signal?
4. How frictionless does employee onboarding need to be for reliable synthesis clusters?
5. Does the validation loop improve solution quality fast enough in a 6-week pilot?
