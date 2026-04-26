---
name: mobile-responsive
description: Use when editing app/**/page.tsx, app/**/layout.tsx, sections/**/*.tsx, components/**/*.tsx, or app/globals.css; or when the user mentions mobile, responsive, breakpoint, viewport, overflow, mobile-first, sm/md/lg, iPad, tablet, 360/390/412/768/1024, hamburger, navbar, RTL, dir="rtl", Hebrew layout, ?lang=he, text-start/text-end, padding, gap, max-w, container width, scroll, horizontal scroll, sticky, fixed positioning, vh/vw/dvh/svh, SectionScroller. Enforces 360/390/412/768/1024 coverage, scrollWidth ≤ clientWidth, mobile-first cascade, navbar clearance, useReducedMotion guard.
---

You are reviewing or producing layout/visual code in this Next.js 15 + Tailwind v4 + bilingual EN/HE site. The site is currently visually polished — your job is to keep it that way while adding new responsive behavior.

# Hard requirements (failure = blocked)

1. **Five real-device viewports must work**: 360 px (small Android), 390 px (iPhone 12/13/14/15), 412 px (Pixel/Galaxy), 768 px (iPad portrait), 1024 px (iPad landscape / small laptop). Verify each visually before declaring done.
2. **Zero horizontal overflow**: `scrollWidth > clientWidth` must be false at every viewport. Most common cause is a `min-width: <px>` or a non-shrinking flex child.
3. **Navbar clearance**: every section needs to clear the fixed navbar. Refer to the spacer pattern in `sections/HeroSection.tsx` (`<div className="h-[64px] lg:h-[90px] shrink-0" />`) — match it or use equivalent `padding-top` so content never slides under the navbar.
4. **Bilingual-safe**: when content can render in Hebrew (`?lang=he`), prefer logical `text-start` / `text-end` / `me-{n}` / `ms-{n}` / `pe-{n}` / `ps-{n}` over `text-left`/`text-right`/`mr-`/`ml-`/`pr-`/`pl-`. The site flips `dir="rtl"` on inner divs in HE — physical-direction utilities only mirror correctly sometimes.
5. **Mobile-first cascade**: write the mobile case first, then add `sm:` / `md:` / `lg:` overrides. `text-base sm:text-lg lg:text-xl`, never the inverse.

# Project conventions to reuse (do NOT reinvent)

- **Full-height sections**: `min-h-[100dvh]` (NOT `h-screen`).
- **Vertical rhythm**: prefer `clamp(min, vh-relative, max)` over fixed px so sections breathe with viewport height.
- **Existing motion variants**: reuse `EASE`, `DUR`, `viewport`, `fadeUp`, `fadeLeft`, `fadeRight`, `stagger`, `staggerFast` from `lib/motion.ts`.
- **`useReducedMotion()` guard**: every framer-motion animation must check it (see `sections/HeroSection.tsx` Ken Burns + glow pulse for the canonical pattern).
- **SectionScroller**: `components/SectionScroller.tsx` does pathname → `scrollIntoView` with an "already-visible" guard. Don't "fix" its useEffect+pathname pattern.

# Things to avoid

- `min-width` on layout children (use `min-w-0` instead to allow flex shrink)
- Fixed pixel widths on text containers — use `max-w-prose` or `max-w-[Xch]`
- `100vw` on elements that aren't full-bleed (CSS scrollbar gutter pushes overflow)
- New CSS `animation:` rules without a `prefers-reduced-motion: reduce` reset
- Adding new breakpoints to Tailwind (defaults sm/md/lg/xl/2xl are sufficient)
- Adding new fonts or font weights — see CLAUDE.md "Fonts (loaded set)"

# Process when invoked

1. Identify the failing viewport(s) — the user often says "mobile" but means a specific width.
2. Read the affected component end-to-end before editing — section padding interacts across components.
3. Make the smallest change that fixes the failure case at all five widths.
4. Verify visually (Playwright / browser MCP) at 360/390/412/768/1024 before declaring done.
5. Confirm scrollWidth ≤ clientWidth via `browser_evaluate` if any horizontal-overflow risk.

Avoid redesigns. Don't change images, fonts, or animation timings — those are frozen.
