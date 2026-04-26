---
description: Full quality audit — clean build, responsive screenshots at 360/390/412/768/1024 across 6 routes, 3-run median Lighthouse mobile, compare against budget. Reports only, never auto-fixes.
---

Run a full quality audit of the site. This is the **manual fallback** path — the hooks already run type-check + lint per edit. Use this command for end-to-end verification (after a feature, before a PR, or to record/refresh the perf baseline).

All Chromium + Lighthouse work runs through the standalone scripts at `.claude/.audit-screenshots.mjs` and `.claude/.audit-lighthouse.mjs`. Both launch headless — no visible browser windows during an audit. The browser MCPs (`mcp__plugin_playwright_playwright__*`, `mcp__chrome-devtools__*`) remain available for ad-hoc debugging in other contexts but are NOT used here.

## Steps (execute in order)

### 1. Pre-flight
- Read `package.json` to confirm `size-limit` is configured.
- Determine the audit target:
  - If the user supplied a Vercel preview URL, set `AUDIT_URL=<that-url>` and use it (real CDN / ISR — source of truth).
  - Otherwise, fall back to localhost: `rm -rf .next && npm run build && npm run start &` then poll until `:3000` responds 200.

### 2. Server readiness (localhost path only)
Wait until the server responds:

```sh
node .claude/scripts/wait-for-server.mjs
# or for a non-default port:
node .claude/scripts/wait-for-server.mjs http://localhost:3001
```

(Plain `node *` is in the allowlist; an `until curl ...; do ...; done` form would prompt because Claude Code's permission rules only support prefix wildcards.)

Skip this step if `AUDIT_URL` points at a Vercel preview — that's already warm enough.

### 3. Responsive screenshots + overflow check (headless Chromium via Playwright)
Run the standalone screenshot script:

```sh
node .claude/.audit-screenshots.mjs
```

What it does:
- Launches Chromium **headless** (`chromium.launch({ headless: true })`)
- Iterates 6 routes × 5 widths LTR + 5 widths RTL on `/?lang=he` = **35 checks**
- Saves screenshots to `.playwright-mcp/audit-{YYYY-MM-DD}/{slug}-{width}.png`
- Records `scrollWidth > clientWidth` per check
- Emits `summary.json` with all results
- Prints one-line-per-check progress and a final failure list

**Hard failure:** any row where `overflow: true` in `summary.json`.

If you want a different date stamp or a custom subset of routes/widths, edit the constants at the top of the script. Don't add CLI args for one-off subsets — the smoke check has its own minimal path.

### 4. Lighthouse — 3-run median, mobile only (headless Chrome via Lighthouse CLI)
Run the standalone Lighthouse script:

```sh
# Default: localhost
node .claude/.audit-lighthouse.mjs

# Or against Vercel preview (authoritative production gate):
AUDIT_URL=https://<your-preview>.vercel.app/ node .claude/.audit-lighthouse.mjs
```

What it does:
- Runs Lighthouse 13 mobile preset **3 times sequentially** against `AUDIT_URL` (default `http://localhost:3000/`)
- Launches Chrome **headless** via `--chrome-flags=--headless=new --no-sandbox`
- Captures Performance, LCP, CLS, TBT, FCP, Speed Index per run
- Computes the median of all metrics
- Writes summary to `.claude/lighthouse/summary.json`

**Pass = median Performance ≥ baseline − 3** (3-pt grace band; baseline lives in `.claude/.perf-baseline.json` — production block is the gate, localhost block is reference only).

**Windows note:** chrome-launcher races on tmp cleanup and exits non-zero AFTER writing the JSON report. The script treats the JSON file as authoritative and ignores the cleanup exit code.

### 5. Bundle audit
```sh
rm -rf .next && npm run build && npx size-limit
```

Any size-limit failure is a hard failure.

### 6. Report
Produce a report at `.claude/.last-audit.md` and print the summary to chat:

```
# Quality audit — {YYYY-MM-DD HH:MM}
Target: {URL}
Build: clean (.next removed)

## Responsive (6 routes × 5 widths = 30 checks)
- ✅ all 30 LTR + 5 RTL pass
(or list the failures with route + width + sw/cw values)

## Lighthouse mobile median (3 runs)
- / : runs perf=A,B,C → median X (budget ≥Y with grace)
- LCP, CLS, TBT/INP — show medians + budget verdicts

## Bundle (size-limit)
- All JS chunks: ___ kB / 1000 kB ✅
- All CSS: ___ kB / 30 kB ✅

## Failures (N)
(file paths + budget deltas + proposed fix per failure)
```

### 7. On failure — REPORT ONLY
Do **not** auto-fix. Surface failures with:
- File paths
- Specific budget deltas
- A proposed fix per failure
- Wait for explicit confirmation before editing.

If the user confirms fixes, load `mobile-responsive` and/or `performance-optimizer` skill, apply changes, re-run `/check-quality`.

### 8. Baseline mode
If `.claude/.perf-baseline.json` does not exist:
- The first successful audit writes the median LH / LCP / CLS / INP / JS-size into it.
- Subsequent runs compare against this baseline instead of the placeholder.

If it exists and the audit measured a **production** URL, refresh `lighthouse.production.*` with the new medians. If the audit measured **localhost**, refresh only `lighthouse.localhost.*` (production gate is independent).

Tell the user: "Baseline updated. Future audits compare against this with a 3-point grace band."

## Notes
- Desktop Lighthouse is **not** gated.
- PSI Diagnostics ("Reduce unused JS", etc.) are not gated — they don't move the score.
- Single-shot Lighthouse is too noisy (±3–5 pts on identical builds). Always 3-run median.
- Localhost is the cheap signal; Vercel preview is the production gate. The two are NOT comparable — localhost runs ~13 perf points better than production due to zero network latency.
- Browser MCPs are explicitly NOT used here — they default to **headed** Chrome which pops a window for every screenshot. The standalone scripts proved more reliable on Windows during the 2026-04-26 audit anyway.
- `/baseline-ui`, `/fixing-accessibility`, `/fixing-motion-performance` are aesthetic surgical fixes — `/check-quality` is end-to-end measurement. They complement; they don't replace each other.
