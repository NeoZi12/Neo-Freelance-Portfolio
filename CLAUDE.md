# Neo Portfolio — Claude Code Rules

## Stack (locked)
- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS v4 — ONE system. No CSS Modules, no emotion, no styled-components.
  - Custom design tokens live in `app/globals.css` under `@theme`.
  - Class merging via `cn()` in `lib/utils.ts` (clsx + tailwind-merge).
- **Components**: shadcn/ui primitives copied into `components/ui/`. Never ship default shadcn look — restyle aggressively with the brand tokens before use.
- **Motion**: `framer-motion` 12.x (a.k.a. `motion/react`). Respect `prefers-reduced-motion`.
- **Icons**: `@iconify/react` + installed icon sets (lucide, tabler, simple-icons, mdi, logos).
- **Carousel**: embla-carousel-react.
- **i18n**: `lib/i18n.ts` (Heebo for Hebrew is already wired).

## Design direction
- Primary aesthetic workflow: **impeccable**. In a new scope, run `/impeccable teach` and fill `.impeccable.md` before design work.
- Brand tokens (already defined in `globals.css`): `--color-brand-orange: #e67e22`, `--color-brand-dark: #252421`, plus per-section dark gradients (about / portfolio / hiw / contact).
- Never use: Inter, Roboto, Arial, system-ui as display fonts. Never ship purple-gradient-on-white AI slop.
- Always: commit to a bold direction, respect the tokens, one strong aesthetic not three.

## Active tooling

### Skills (`.claude/skills/`)
- **impeccable** (primary) — `/impeccable craft|teach|extract` plus 17 polish/edit commands: `/audit /critique /polish /distill /clarify /optimize /harden /animate /colorize /bolder /quieter /delight /adapt /typeset /layout /overdrive /shape`.
- **Anthropic frontend-design plugin** — base aesthetic layer that impeccable extends.
- **ui-skills** — technical audit pass after design:
  - `baseline-ui` → spacing / typography / state consistency
  - `fixing-accessibility` → WCAG, ARIA, keyboard, focus
  - `fixing-motion-performance` → compositor props, reduced-motion, jank
- **quality-gate** (this project) — `mobile-responsive` + `performance-optimizer` skills auto-invoke on relevant edits; `/check-quality` runs the manual full audit.

### Subagents (`.claude/agents/`)
- `frontend-developer` — React 19 / Next 15 component work.
- `code-reviewer` — quality pass on changed code.
- `security-auditor` — before deploy.

### MCPs
- `context7` — live library docs (Framer Motion, Next, shadcn, Tailwind).
- `chrome-devtools` — visual iteration, live DOM / perf inspection during dev.
- `playwright@claude-plugins-official` — E2E verification before deploy. Disable when not testing to save context.

## Rules for future sessions
1. **One styling system**: Tailwind only. Do not add CSS Modules, emotion, or styled-components.
2. **shadcn primitives are starting points, not ends**: always restyle using brand tokens. No default shadcn look in production.
3. **Design → audit pipeline**: after any UI change, run `/baseline-ui` then `/fixing-accessibility` then `/fixing-motion-performance` (or invoke them through impeccable's `/audit` / `/polish`).
4. **Tokens over literals**: never hard-code `#e67e22` — use `var(--color-brand-orange)` or the Tailwind class that resolves to it.
5. **Animation budget**: CSS-only for micro-interactions; framer-motion for orchestrated sequences. Always respect `prefers-reduced-motion`.
6. **Responsive**: `min-h-[100dvh]` (not `h-screen`) for full-height sections. Mobile-first breakpoints.
7. **Before deploy**: run the `code-reviewer` and `security-auditor` subagents; enable Playwright MCP and verify core flows (contact form, portfolio navigation, language toggle).
8. **Conflict resolution**: if impeccable and ui-skills disagree — impeccable wins on aesthetics, ui-skills wins on technical baselines (a11y, perf, motion durations).
9. **No new aesthetic skills** without removing an existing one. The stack is intentionally trimmed to avoid conflicting voices.
10. **Quality gate vs. impeccable / ui-skills**: hard rules (lint, hooks, /check-quality budget) win on correctness. Aesthetic skills win on visual judgement. If a polish suggestion would break a hard rule, the hard rule wins; surface the conflict in chat.

---

# Quality gate — hard rules

This project enforces an automatic quality gate on top of the impeccable / ui-skills design pipeline. Every edit is checked. Hooks fire on PostToolUse and Stop; ESLint blocks on the rules below; `/check-quality` is the manual full audit.

## Stack truths (do not assume otherwise)
- Next.js 15 App Router · React 19 · TypeScript strict
- Tailwind v4 (CSS-first; tokens live in `app/globals.css` `@theme`)
- framer-motion v12 used directly (no LazyMotion in this project — `<motion.div>` is fine)
- Bilingual EN/HE via `?lang=` toggle. Default `<html lang="en">`. RTL is per-page via `dir="rtl"` on inner divs (`sections/HeroSection.tsx` is the reference)
- No CSP, no CAPTCHA env keys; contact form uses EmailJS + MailerLite (env: `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID`)
- Custom scroll system: `components/SectionScroller.tsx` does pathname → `scrollIntoView` with an "already-visible" guard. Don't "fix" its useEffect+pathname pattern.

## Responsiveness (non-negotiable)
- Every visual change MUST work at **360 / 390 / 412 / 768 / 1024 px** wide (real-device viewports)
- Mobile-first Tailwind (`text-base sm:text-lg lg:text-xl`); never lg-first
- `scrollWidth > clientWidth` must be **false** at every viewport above. Horizontal overflow is a hard fail.
- Use existing `clamp()` patterns and `min-h-[100dvh]` (not `h-screen`)
- Sections must clear the fixed navbar — refer to the spacer pattern in `sections/HeroSection.tsx` (`h-[64px] lg:h-[90px]`)
- RTL: when content can be Hebrew, prefer logical `text-start` / `text-end` / `me-`/`ms-`/`pe-`/`ps-` over physical equivalents

## Performance budget (enforced by /check-quality)
- Mobile Lighthouse Performance: **median of 3 runs** ≥ 85 (placeholder until first `/check-quality` run records a real baseline), 3-point grace band
- LCP ≤ 2.5s · CLS ≤ 0.1 · INP ≤ 200ms (Web Vitals "good")
- JS chunks total (gzip, all of `.next/static/chunks/**/*.js`): ≤ **1000 KB** — current baseline 963 KB (note: most of this is from the 5 `@iconify-icons/*` sets; tightening after icon-set sweep is a future task)
- CSS total (gzip, all of `.next/static/css/**/*.css`): ≤ **30 KB** — current baseline 17 KB
- No new dependencies without justifying bundle impact in PR description
- Lighthouse runs against the **Vercel preview URL** — localhost only as fallback (no real CDN/ISR)

Bundle baselines locked from the first clean `next build --no-lint` of `chore/quality-gate` (see `.claude/.perf-baseline.json`). LH baseline replaced after the first full `/check-quality` run.

## Stack-specific hard rules (these silently break things)
- **`<Image priority>` is allowed only on `sections/HeroSection.tsx`** (the orange-ringed avatar `<Image>` is the LCP). Anywhere else wastes preload budget and hurts LCP. Lint enforces.
- **No raw `getBoundingClientRect()` inside scroll/resize listeners** without `requestAnimationFrame` coalescing.
- **Tailwind only.** No CSS Modules (`*.module.css` import), no `@emotion/*`, no `styled-components`. Lint enforces via `no-restricted-imports`.
- **`rm -rf .next` before any production-build measurement.** Even on webpack-default Next 15 this produces predictable bundle numbers.

## Animations (frozen — DO NOT degrade for perf)
- framer-motion via direct `motion.*` API (no LazyMotion here)
- Reuse `EASE`, `DUR`, `viewport` from `lib/motion.ts`
- Always wrap with `useReducedMotion()` guard (see `sections/HeroSection.tsx` and the avatar glow pulse for the canonical pattern)
- Don't swap framer-motion for a lighter lib; tree-shaking already configured via `experimental.optimizePackageImports`

## Images (frozen)
- Use `next/image` always; never raw `<img>`
- LCP image (`sections/HeroSection.tsx`): `priority` + `sizes`
- Below-the-fold images: `loading="lazy"`, no `priority`
- Don't change formats, don't re-encode, don't trim — assets are frozen
- Don't tweak `quality={...}` on existing `<Image>` — locked

## Fonts (loaded set — don't add new fonts/weights without asking)
- Geist (variable, primary `--font-sans`)
- Montserrat 400/500/600/700 (`--font-montserrat`)
- Plus Jakarta Sans 500/700/800 (`--font-jakarta`)
- Inter 400/600 (`--font-inter`)
- Heebo 400/500/600/700/800 — Hebrew only, `preload: false`
- Island Moments 400 — decorative logo, `preload: false`

## Colors & tokens
Use the tokens already defined in `app/globals.css` `@theme` block. Don't introduce new brand colors without asking. Current set:
- `--color-brand-orange: #e67e22`, `--color-brand-dark: #252421`
- Section gradients: `--color-about-dark/warm`, `--color-portfolio-dark/warm`, `--color-hiw-dark/warm`, `--color-contact-dark/warm`, `--color-card-dark`

## Accessibility (WCAG AA)
- Color contrast ≥ 4.5:1 body, ≥ 3:1 large text and UI
- Keyboard navigable; focus rings visible
- Semantic HTML: `<button>` for actions, `<a href>` for navigation, real h1→h6
- Reduced-motion: every framer-motion animation must already be guarded; don't add raw CSS `@keyframes` without a `prefers-reduced-motion: reduce` reset

## What we deliberately DO NOT enforce (avoid noise)
- PSI Diagnostics ("Reduce unused JS", "long main-thread tasks") — third-party-driven
- Desktop Lighthouse — if mobile passes, desktop passes
- Auto-fix on quality-gate failure — report only, ask before editing
- Single-shot Lighthouse — always 3-run median with 3-point grace band
- Font-weight regex lint — too noisy with the multi-font setup; rely on the loaded-set list above

## Automatic check loop — what runs and when
- **PostToolUse** (Edit/Write to `app/`, `sections/`, `components/`, `lib/`, `contexts/`, `hooks/` (`*.{ts,tsx,css}`) or `next.config.ts`): `tsc --noEmit` + `eslint <touched file>`. Failures fed back; must self-correct.
- **Stop** (assistant declares done, any source edit happened this session): `rm -rf .next && next build && size-limit`. Failures fed back.
- **`/check-quality`** (manual): clean `.next`, warm each route, Playwright screenshots at 360/390/412/768/1024 across 6 routes, Chrome DevTools `lighthouse_audit` mobile × 3 → median, compare with 3-pt grace, report only.
