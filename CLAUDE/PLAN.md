# Design Redesign Plan — implicit.ai
> Reference: Screenshots from Ontora.ai (competitor), captured 2026-04-21
> Goal: Match the visual maturity, whitespace discipline, and layout sophistication of the reference designs.

---

## What the Reference Shows (Observations)

The reference site (Ontora.ai) uses a pattern of extreme restraint that makes it feel premium:

1. **Two-line heading rhythm** — Every major heading uses a two-line pattern: line 1 is bold black at full size, line 2 is the same size but muted gray. Creates hierarchy without shrinking the font.
2. **Split 2-col step layout** — "How It Works" uses one step per scroll block, with text on one side and a realistic UI mockup on the other. Steps alternate sides. Ghost step numbers (very faint, oversized) anchor each block.
3. **Stats as raw numbers** — Metrics are displayed as large bold numbers ("100s", "100%") directly inline, not in cards. Small label below. No boxes.
4. **Testimonial as a section break** — Full-width centred serif-ish quote (~36px, center-aligned) used between major sections as a rhythm break and social proof moment.
5. **Feature grid without card backgrounds** — 2-column icon + title + body layout. No card border/fill. Just whitespace and a simple line icon. Feels architectural, not widget-y.
6. **Black pill CTA** — The primary conversion button is a dark/black rounded pill with a "↓" or "→" arrow. High contrast, confident.
7. **Zero decorative gradients** — No blurred orbs, no grid backgrounds, no teal glows. Just type, whitespace, and UI mockups as illustrations.
8. **Realistic UI mockups** — Each step shows a real-looking screen (chat interface, video call, workflow list). These double as product proof.

---

## Gap Analysis — Current implicit.ai vs Reference

| Area | Current implicit.ai | Reference style | Priority |
|------|---------------------|-----------------|----------|
| Section headings | Single line, teal accent | Two-line: black + gray | HIGH |
| HowItWorks layout | Aceternity Timeline (vertical scroll bar) | Split 2-col step blocks per step | HIGH |
| Step visuals | Text cards with checklist/bar chart | Realistic UI mockup screenshots | HIGH |
| Background decoration | Orbs, grid overlay in Hero | Clean white, no decoration | MEDIUM |
| Stats display | Badges in cards | Raw bold numbers inline | MEDIUM |
| USP section | Strikethrough "not this" layout | 2-col icon grid (no card bg) | HIGH |
| Testimonial | None | Full-width centred quote break | HIGH |
| CTA button | Teal fill with animated slide | Dark pill with arrow | MEDIUM |
| Whitespace | Moderate | Much more generous | MEDIUM |
| Hero | Orbs + grid + fade-up | Clean, ultra-minimal | LOW (last) |

---

## Implementation Plan

### Phase 1 — HowItWorks Redesign (highest visual impact)
**File:** `HowItWorks.astro` + `ui/how-it-works-timeline.tsx`

Replace the Aceternity vertical timeline with a **split-column step layout**:
- Each step: full-width block, `min-height: 100vh` or generous padding
- Text column (left on odd, right on even): "Step 01" eyebrow in teal, large heading, body, optional inline stats
- Visual column: a styled UI mockup component (React) specific to each step
- Ghost step number: absolute positioned, very large (e.g. `font-size: 200px`), `color: var(--color-border)`, `z-index: 0`
- Section header above all steps: two-line pattern ("Three steps." black / "From deployment to clarity." gray)

**Three step mockups to build:**
1. **Deploy** → Chat interface mockup (AI agent greeting an employee, asking a question)
2. **Interviews at scale** → Video call UI mockup (employee face placeholder + AI logo, call controls)
3. **The Map** → Workflow/results card (cluster list with statuses: ✓ done, ⟳ processing, pending)

---

### Phase 2 — Two-Line Heading System
**Files:** `Hero.astro`, `TheProblem.astro`, `ValidationLoop.astro`, `USP.astro`, `DemoCTA.astro`

Apply the two-line heading pattern across all sections:
```
<h2>
  <span class="heading-line-1">What stays</span>
  <span class="heading-line-2">silent.</span>   ← currently teal accent
</h2>
```
→ Change to: line 1 bold dark (`--color-text-primary`), line 2 muted gray (`--color-text-tertiary`), both same font size. Remove the teal underline animation on hero accent.

The teal accent color moves to eyebrow labels only (not headings).

---

### Phase 3 — USP Section Redesign
**File:** `USP.astro`

Replace the strikethrough "not this / this" layout with a **2-column icon feature grid**:

```
[icon]  [icon]
Title   Title
Body    Body

[icon]  [icon]
Title   Title
Body    Body
```

- No card backgrounds, no borders on items — just generous row gap
- Simple stroke SVG icons (24px, `var(--color-text-tertiary)`)
- Feature titles in `font-weight: 700`, body in `--color-text-secondary`
- Section heading uses two-line pattern: "Everything you need / to surface any signal."

Four features to highlight:
1. **AI interviews at scale** — Reaches every employee in hours, not months
2. **Signal synthesis** — Clusters thousands of voices into actionable intelligence
3. **Hypothesis generation** — AI-generated solution directions, not just problems
4. **Validated venture cases** — Output is pre-validated, not a report

---

### Phase 4 — Testimonial Section (new)
**File:** new `Testimonial.astro`

Full-width centered quote block, placed between ValidationLoop and USP:
- `text-align: center`, `max-width: 720px`, `margin: 0 auto`
- Quote text: `font-size: clamp(1.5rem, 3vw, 2.25rem)`, `font-weight: 500`, `line-height: 1.4`, `color: --color-text-primary`
- Opening `"` in teal accent, oversized
- Attribution below: name + role, `--color-text-tertiary`, small caps
- Placeholder text until a real quote exists (flag in go-live checklist)

---

### Phase 5 — Hero Cleanup
**File:** `Hero.astro`

Remove the decorative layer (orbs + grid background). The hero already has strong typography — the decoration competes with it.

- Delete `.hero__orb` divs and their CSS
- Delete `.hero__grid` div and its CSS
- Keep fade-up animations on text elements
- Add more generous top padding (increase breathing room)
- Apply two-line heading pattern to hero headline

---

### Phase 6 — Spacing & Whitespace Pass
**Files:** All components + `design.css`

- Increase `--section-padding` from `var(--space-24)` to `var(--space-32)` top/bottom
- Increase line-height on body copy from `1.75` to `1.8`
- Increase max-width on body paragraphs (reduce column width from ~580px to ~520px for better readability)
- Add `--space-40: 10rem` and `--space-48: 12rem` tokens for hero/section breathing

---

## Component Execution Order

```
1. USP.astro              ← purely Astro, self-contained, big visual gain
2. Testimonial.astro      ← new file, pure Astro, quick win
3. HowItWorks             ← biggest lift, replace timeline with split-col
4. Two-line headings      ← global pass across all components
5. Hero cleanup           ← remove orbs/grid
6. Spacing pass           ← final polish
```

---

## Design Tokens to Add/Change

```css
/* New tokens needed */
--color-text-heading-muted: var(--color-text-tertiary);  /* for two-line gray */
--space-40: 10rem;   /* 160px */
--space-48: 12rem;   /* 192px */

/* Token changes */
/* --section-padding: var(--space-32) var(--space-4) */  ← increase from space-24
```

---

## Files to Create
- `src/components/Testimonial.astro` — new full-width quote section
- `src/components/ui/step-mockup-deploy.tsx` — chat UI mockup
- `src/components/ui/step-mockup-interviews.tsx` — video call UI mockup
- `src/components/ui/step-mockup-map.tsx` — workflow results UI mockup
- `src/components/HowItWorksSteps.astro` — replaces timeline-based HowItWorks

## Files to Significantly Modify
- `src/components/USP.astro` — full rewrite to icon grid
- `src/components/Hero.astro` — remove orbs/grid, two-line heading
- `src/components/HowItWorks.astro` — shell pointing to new component
- `src/styles/design.css` — new spacing tokens
- `src/pages/index.astro` — add Testimonial between ValidationLoop and USP
- `src/pages/de/index.astro` — same

---

## What NOT to Change
- Design tokens (colors, font) — already well-calibrated for light mode
- Nav — clean and functional
- Footer — recently improved
- ValidationLoop — the 5-stage flow is core brand; keep the card layout
- DemoCTA — card with founder quote is good; just apply two-line heading tweak
