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
