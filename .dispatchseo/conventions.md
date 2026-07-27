# Site facts — neozino.dev

## Product

Neo's freelance web-development portfolio and lead-gen site. Sells custom web
development services (Next.js/React builds) to small businesses and founders
hiring a freelance developer; the blog supports that positioning rather than
being a generic tech blog aimed at other developers.

Product-surface files to read fresh each research run:
- `CLAUDE.md` (repo root) — full stack rules, design direction, quality bar
- `sections/ServicesSection.tsx` — the services actually offered
- `sections/AboutSection.tsx`, `sections/WhyAndTestimonialsSection.tsx` — positioning, credibility signals
- `sections/PortfolioSection.tsx` — project types shown as proof of work
- `sections/HowItWorksSection.tsx` — the engagement process
- `app/free-guide/page.tsx` — existing lead-magnet framing/CTA copy
- `app/services/page.tsx`, `app/about/page.tsx`, `app/portfolio/page.tsx` — full page copy

## Stack & build

- Next.js 15 App Router, React 19, TypeScript strict, root-level layout (`app/`, not `src/app/`)
- Tailwind CSS v4 (CSS-first, tokens in `app/globals.css` under `@theme`)
- **Package manager: npm** (`package-lock.json`, no `packageManager` field). No pnpm/yarn/bun anywhere in this repo.
- Build/verify: `npm run build` (production build). `npm run lint` (ESLint) and `npm run type-check` (`tsc --noEmit`) both gate every change.
- **Never run a raw production build against the live `.next/` directory** — the owner runs `npm run dev` continuously in a separate terminal and `.next/` is its live cache. Use `NEXT_DIST_DIR=.next-prod-check-<name> npx next build` for any isolated build check, then remove the temp dir afterward. Never `rm -rf .next`.
- CI validators: none of this repo's own CI gates content PRs today beyond the DispatchSEO pipeline's own workflows (`seo-tool-validate.yml` builds+browser-tests tool PRs; guide PRs rely on the pipeline's own `npm run build` verify step before opening the PR).
- No CSP, no CAPTCHA env keys. No `NEXT_PUBLIC_*` env vars are read anywhere in source — don't add placeholder envs to CI unless a new feature actually needs one.

## Guides

- Content directory: `content/blog/*.mdx` (repo root, not under `src/`)
- Rendering: `next-mdx-remote/rsc` + `gray-matter` for frontmatter (chosen over `@next/mdx` because this is a content collection — list + sort + detail — not MDX-as-route-segments)
- Frontmatter contract (`lib/blog.ts` `PostFrontmatter` type), all required:
  - `title: string`
  - `description: string` (used as the card/meta description)
  - `date: string` — ISO `"YYYY-MM-DD"`. **Always get today's real date via `date -u +%F` in the shell before writing any date — never from memory.**
  - `tags: string[]`
  - `author: string` (use `"Neo Zino"` unless told otherwise)
- Slug = filename without `.mdx` (e.g. `content/blog/my-post.mdx` → `/blog/my-post`)
- Headings: use `## ` (H2) for every major section — the detail page's "On this page" ToC is auto-built from H2s only (`lib/blog.ts` `extractHeadings`); H3+ won't appear in the ToC.
- Reading time is computed automatically from word count (200 wpm) — never set it manually.
- The platform renders automatically per post: sitemap entry (`app/sitemap.ts` reads every file in `content/blog/`), the sticky ToC + product promo-card sidebar on desktop (hidden on mobile), and MDX element styling via `lib/mdx-components.tsx` (h2/h3, p, lists, blockquote, code/pre, table all pre-styled — don't hand-roll raw HTML/inline styles in post bodies).
- No JSON-LD/FAQPage schema emitted yet — a future task if the pipeline wants it.
- Internal linking: link to `/services`, `/contact`, `/portfolio` where it naturally supports the ICP fit; avoid linking to competitor tooling.
- Exemplar post to read before drafting: `content/blog/how-to-choose-a-freelance-web-developer.mdx` (the only post that exists so far — read its structure and tone directly, since it's also the humanizer-pass reference for voice).

## Tools

No tool registry or reference implementation exists yet in this repo. The
first tool builder run must scaffold the registry/wiring pattern itself
(there is no existing `/tools/*` route or component to copy) — read the
`build-tool` instructions carefully for what's expected, since there is no
local precedent here yet.

## Design system

- Theme tokens: `app/globals.css` under the `@theme` block. Brand tokens:
  - `--color-brand-orange: #e67e22`, `--color-brand-dark: #252421`
  - Per-section dark gradient pairs (`-dark` = gradient start, `-warm` = gradient end): `--color-about-dark/warm`, `--color-portfolio-dark/warm`, `--color-hiw-dark/warm`, `--color-contact-dark/warm`, and now `--color-blog-dark: #0c0e11` / `--color-blog-warm: #1c130b` (added for the blog section, following the same naming convention — reuse these for any blog-adjacent surface, don't invent new ones)
  - `--color-card-dark: #202020` — general dark card background
- Never hard-code hex values — always use the CSS var or the Tailwind class that resolves to it.
- Icons: `@iconify/react` with the installed sets (lucide, tabler, simple-icons, mdi, logos) — no new icon packages.
- shadcn primitives live in `components/ui/` — always restyled with brand tokens, never shipped with default shadcn look.
- Exemplar visual components to match tone/spacing against:
  - `sections/HeroSection.tsx` — canonical `useReducedMotion` guard pattern, LCP `<Image priority>` usage, navbar-clearance spacer (`h-[64px] lg:h-[90px]`)
  - `components/PortfolioHome.tsx` / `sections/PortfolioSection.tsx` — the "always-on orange ring" card hover idiom (the blog's `PostCard.tsx` deliberately inverts this to a quiet hairline border with hover-only orange ring, since a 20+-item grid needs quieter default state than a 4-6 item portfolio grid)
- Blog-specific components (new): `components/blog/PostCard.tsx` (grid + featured card), `components/blog/TableOfContents.tsx`, `components/blog/PromoCard.tsx` — read these before building further blog UI so new pieces match.
- Responsive: mobile-first Tailwind, test at 360/390/412/768/1024, `min-h-[100dvh]` not `h-screen`, zero horizontal overflow at every breakpoint.

## Voice & writing rules

- Author attribution: `"Neo Zino"` in frontmatter `author`.
- Run every guide's prose through the **humanizer skill** (`~/.claude/skills/humanizer/`) before publishing — strips em dashes, inflated-symbolism, "rule of three," and other AI-writing tells. The seed post was written this way; match its tone (direct, concrete, second-person "you," no hype words).
- Punctuation: no em dashes in body copy (humanizer enforces this).
- First-person: the site speaks as Neo directly (see `AboutSection.tsx`, `WhyAndTestimonialsSection.tsx`) — guides can do the same in intros/conclusions, but body sections should stay reader-focused ("you").
- No hype words ("revolutionary", "game-changing", "cutting-edge") anywhere, guides or site-profile copy alike.

## Analytics

- `@vercel/analytics/next` (`<Analytics />` in `app/layout.tsx`) — automatic pageview tracking, no custom event helper exists yet. No custom event-naming convention to follow for guides; nothing extra to instrument on a new blog post.

## Notes

- Bilingual EN/HE toggle (`?lang=` query param, `lib/i18n.ts`) applies to the core portfolio site; the blog itself is English-only content (SEO guides target English search intent) — the nav string `nav.blog` was added for both locales, but post bodies do not need Hebrew translation.
- This is a fresh DispatchSEO project (self-hosted, local backend at `localhost:4005`) — content mode is "create," so `/blog` and this conventions file are the FIRST content-system additions to the repo, added in PR #9 (`feat/blog-content-home`), separate from the pipeline-install PR (#8).
