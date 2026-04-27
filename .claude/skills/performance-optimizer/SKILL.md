---
name: performance-optimizer
description: Use when editing next.config.ts, app/layout.tsx, app/page.tsx, components/MotionProvider.tsx, lib/motion.ts; or when adding any new <Image>, framer-motion import, npm dependency, external <script>, fetch() URL, or scroll/resize listener; or when the user mentions bundle, LCP, CLS, INP, Core Web Vitals, Lighthouse, performance, perf, loading, slow, jank, layout shift, FCP, TTI, TTFB, hydration, RSC, Server Component, "use client", priority image, lazy load, preload, prefetch, bundle size, framer-motion tree-shaking, dynamic import, ISR, revalidate, optimizePackageImports. Enforces median-of-3 mobile LH ≥ baseline w/ 3-pt grace; LCP≤2.5s; CLS≤0.1; INP≤200ms; size-limit on all chunks; <Image priority> only on sections/HeroSection.tsx; rAF-coalesce scroll/resize listeners.
---

You are reviewing or producing performance-sensitive code in this Next.js 15 site. Your job is to protect Core Web Vitals while adding new functionality.

# Hard rules (failure = lint error or runtime regression)

1. **`<Image priority>` is allowed only on the LCP image of `sections/HeroSection.tsx`.** That's the orange-ringed avatar — `priority + sizes` on the inner `<Image>`. Anywhere else wastes preload budget and hurts LCP. Lint enforces (ignore-list).
2. **No raw `getBoundingClientRect()` inside `addEventListener('scroll', ...)` or `addEventListener('resize', ...)`** without `requestAnimationFrame` coalescing. Read existing components before adding new listeners.
3. **Production build cleanliness**: `rm -rf .next` before any size-limit measurement so chunk sets are predictable.
4. **No new heavy dependencies** without measuring delta on `.next/static/chunks/**/*.js` total via `npx size-limit`. State the expected size impact in the PR.
5. **Tailwind v4 only.** No CSS Modules, no `@emotion/*`, no `styled-components` — these would re-introduce render-blocking CSS or runtime style injection. Lint enforces via `no-restricted-imports`.

# Project conventions to reuse

- **Image pattern (LCP)**: `<Image src="/images/neo2d.png" alt="..." fill priority sizes="(min-width: 1024px) 340px, 220px" className="object-contain object-top" />` — only in `sections/HeroSection.tsx`.
- **Image pattern (below fold)**: `<Image ... loading="lazy" />` (no `priority`).
- **Bundle imports**: rely on `experimental.optimizePackageImports: ["framer-motion", "@iconify/react"]` in `next.config.ts` for tree-shaking. If you import a new heavy lib, consider adding it to that list.
- **Motion primitives**: `EASE = [0.22, 1, 0.36, 1]`, `DUR = 0.75`, `viewport = { once: true, margin: "-100px 0px" }` — reuse from `lib/motion.ts`.
- **Reduced motion**: `useReducedMotion()` guard on every framer-motion animation — see HeroSection.tsx (Ken Burns + glow pulse) for the canonical pattern.
- **Compositor-friendly animations**: `willChange: transform`, `backfaceVisibility: hidden` on motion containers; animate `opacity` + `transform` only, never layout properties.

# Performance budget (enforced by /check-quality, lint, and size-limit)

| Metric | Threshold |
|---|---|
| Mobile LH Performance (median of 3) | ≥ baseline (placeholder 85), 3-point grace band |
| Mobile LCP | ≤ 2.5s |
| Mobile CLS | ≤ 0.1 |
| Mobile INP | ≤ 200ms |
| `.next/static/chunks/**/*.js` (gzip total) | ≤ 350 KB (placeholder; replaced by baseline) |
| `.next/static/chunks/**/*.css` (gzip total) | ≤ 20 KB (placeholder; replaced by baseline) |

# Things to avoid

- New runtime dependencies without measuring delta on total JS chunk size
- `useEffect` for things `<Image>` already handles (preloading, sizing)
- Custom font loading or new font weights — see CLAUDE.md "Fonts (loaded set)"
- Image format swaps, re-encoding, or `quality={...}` changes — assets are frozen
- Degrading or removing animations to claw back perf — animation fidelity is protected by user instruction; find perf elsewhere
- Adding `next/script` strategies more aggressive than `afterInteractive` for non-critical scripts
- Auto-fixing on /check-quality failure — surface the diff, ask first

# Process when invoked

1. Identify the specific Web Vital or budget metric the change risks.
2. Measure current state if a baseline exists (run `npm run build`; or run `/check-quality` for end-to-end).
3. Propose the smallest change that fits the budget. State the expected delta.
4. Run the build after editing — `rm -rf .next && npm run build` — and confirm `npx size-limit` passes.
5. If touching layout or LCP, run `/check-quality` and confirm median LH stays in band.

When in doubt: load this skill and ask explicitly: "will this affect total JS chunk size / LCP image / scroll-listener perf?" — those three are the high-leverage failure modes.
