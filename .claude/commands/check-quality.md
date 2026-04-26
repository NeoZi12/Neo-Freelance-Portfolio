---
description: Full quality audit — clean build, responsive screenshots at 360/390/412/768/1024 across 6 routes, 3-run median Lighthouse mobile, compare against budget. Reports only, never auto-fixes.
---

Run a full quality audit of the site. This is the **manual fallback** path — the hooks already run type-check + lint per edit and `next build` on Stop. Use this command for end-to-end verification (after a feature, before a PR, or to record/refresh the perf baseline).

## Steps (execute in order)

### 1. Pre-flight
- Read `package.json` to confirm `size-limit` is configured.
- Determine the audit target:
  - Ask the user for a Vercel preview URL. If supplied, use it (real CDN / ISR — source of truth).
  - Otherwise, fall back to localhost: `rm -rf .next && npm run build && npm run start &` then poll `:3000` until ready.

### 2. Warmup
Even without ISR, hitting each route once before measuring stabilizes timing (cold compilation/cache effects on localhost; cold edge worker on Vercel preview). Warm:
- `/`, `/about`, `/portfolio`, `/services`, `/contact`, `/free-guide`
- Use `mcp__plugin_playwright_playwright__browser_navigate` to each, wait for load.

### 3. Responsive screenshots + overflow check
For each route in `["/", "/about", "/portfolio", "/services", "/contact", "/free-guide"]`:
- For each width in `[360, 390, 412, 768, 1024]`:
  - `mcp__plugin_playwright_playwright__browser_resize` to that width × 900
  - `mcp__plugin_playwright_playwright__browser_navigate` to the route
  - `mcp__plugin_playwright_playwright__browser_take_screenshot` → save as `.playwright-mcp/audit-{YYYY-MM-DD}/{route-slug}-{width}.png`
  - `mcp__plugin_playwright_playwright__browser_evaluate` with `() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`. If `sw > cw`, **record as a hard failure** for that route+width.

Repeat the screenshot pass once with `?lang=he` on `/` to spot-check RTL. Don't run all 30 in HE — Hebrew flips logical utilities only; one home-page check per width is enough.

### 4. Lighthouse — 3-run median, mobile only
For `/` (and any other route the user specifies):
- Run `mcp__chrome-devtools__lighthouse_audit` with mobile preset, three times, sequentially.
- Record the three Performance scores plus LCP / CLS / INP.
- Compute the **median** of the three Performance scores.
- Compare against the budget in `CLAUDE.md` (currently placeholder ≥85; check if a baseline file exists at `.claude/.perf-baseline.json` and use that instead if present).
- Pass = median ≥ budget − 3 (3-point grace band). Single-shot dips are not failures.

### 5. Bundle audit
- `rm -rf .next && npm run build && npx size-limit` — capture output.
- Any size-limit failure is a hard failure.

### 6. Report
Produce a report at `.claude/.last-audit.md` and print to chat:

```
# Quality audit — {YYYY-MM-DD HH:MM}
Target: {URL}
Build: clean (.next removed)

## Responsive (6 routes × 5 widths = 30 checks)
- ✅ / @ 360 / 390 / 412 / 768 / 1024
- ❌ /portfolio @ 360 — scrollWidth 412 > clientWidth 360 — likely sections/PortfolioSection.tsx
- ...

## RTL spot-check (home, 5 widths, ?lang=he)
- ✅ all widths

## Lighthouse mobile median (3 runs)
- / : 92, 91, 93 → median 92 ✅ (budget ≥85 with grace)
- LCP: 1.8s · CLS: 0.02 · INP: 140ms — all in band

## Bundle (size-limit)
- All JS chunks: 287 KB / 350 KB ✅
- All CSS: 14 KB / 20 KB ✅

## Failures (0)
(or list of files + budget deltas)
```

### 7. On failure — REPORT ONLY
Do **not** auto-fix. Surface the failures with:
- File paths
- Specific budget deltas
- A proposed fix per failure
- Wait for explicit confirmation before editing.

If the user confirms fixes, load `mobile-responsive` and/or `performance-optimizer` skill, apply changes, re-run `/check-quality`.

### 8. Baseline mode (first run only)
If `.claude/.perf-baseline.json` does not exist:
- The first successful audit writes the median LH / LCP / CLS / INP / JS-size into it.
- Subsequent runs compare against this baseline instead of the placeholder.
- Tell the user: "Baseline locked. Future audits compare against this with a 3-point grace band."

## Notes
- Desktop Lighthouse is **not** gated.
- PSI Diagnostics ("Reduce unused JS", etc.) are not gated — they don't move the score.
- Single-shot Lighthouse is too noisy (±3–5 pts on identical builds). Always 3-run median.
- Existing `/baseline-ui`, `/fixing-accessibility`, `/fixing-motion-performance` slash commands are aesthetic surgical fixes — `/check-quality` is end-to-end measurement. They complement; they don't replace each other.
