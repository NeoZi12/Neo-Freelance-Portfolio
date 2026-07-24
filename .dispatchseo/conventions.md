# DispatchSEO site facts — Neo-Portfolio (neozino.dev)

Reference card for the SEO pipeline. Every claim is from a file actually read;
paths are cited inline. Keep terse. Re-run `/seo-setup` (or `set_conventions`)
whenever this changes.

## 1. Product

**neozino.dev** is Neo Zino's site: a freelance web developer who also builds
developer tools for Claude Code. The homepage (`app/page.tsx`, no `?lang`) is a
dark "portal" that routes to two products — **ClockedCode** (a setup kit that
takes a stock Claude Code install to full power) and **UsageCut** (a local scan
that cuts wasted tokens). `?lang=he|en` renders the older freelance single-page
site (`components/PortfolioHome.tsx`).

- **Who types the queries we want (ICP):** (a) people looking to *hire a
  freelance web developer* → convert via the contact form; (b) Claude Code
  users evaluating setup/token tooling → the portal's product audience. Prefer
  buyer-intent evergreen for (a); Claude-Code-practitioner topics for (b).
- **Product-surface files to read fresh each research run:** `app/page.tsx`
  and the portal components it renders; `components/PortfolioHome.tsx` +
  `sections/*`; `lib/i18n.ts` (all site copy, EN+HE); `app/layout.tsx`
  (metadata + Organization JSON-LD, product one-liners).

## 2. Stack & build

- Next.js 15 (App Router) · React 19 · TypeScript strict · **Tailwind v4**
  (CSS-first; tokens in `app/globals.css` `@theme`). Package manager **pnpm**.
- Build / verify: `pnpm build` (= `next build`). **Never touch `.next/`** (the
  owner runs `next dev` against it continuously). Production/verify builds go to
  an isolated dir: `rm -rf .next-prod-check && NEXT_DIST_DIR=.next-prod-check pnpm exec next build`,
  then `pnpm exec size-limit`.
- **Bundle budgets (hard):** JS ≤ 1000 KB gz (baseline ~963), CSS ≤ 30 KB gz.
  `next.config.ts` sets `optimizePackageImports` for framer-motion + @iconify and
  `inlineCss`. `<Image priority>` is lint-restricted to `sections/HeroSection.tsx`.
- CI validators: ESLint quality gate; `seo-tool-validate` workflow smoke-tests
  tool PRs live before merge.

## 3. Guides (the active content channel)

- **Location:** `content/blog/<slug>.mdx` (root-level; this repo has no `src/`).
  Slug = filename without `.mdx`. Loader + contract: `lib/blog.ts`.
- **Frontmatter contract** (`lib/blog.ts` documents it): `title` (req),
  `description` (req, ≤160), `date` (req, ISO), `author` (opt, default
  "Neo Zino"), `cover` (opt, path under `/blog/covers/`), `tags` (opt string[]),
  `draft` (opt bool — excluded from list/sitemap/static-params).
- **Rendering:** server-side MDX via `next-mdx-remote/rsc` in
  `app/blog/[slug]/page.tsx`. MDX element map: `components/blog/mdx-components.tsx`
  (H2/H3 auto-get slugified `id`s + scroll-margin for the ToC; brand-orange
  links; styled `p/ul/ol/li/blockquote/code/pre/table/img`; images via
  `next/image`, **never `priority`**).
- **The template renders automatically — do NOT hand-add these in article body:**
  the article header, a sticky desktop "On this page" ToC rail
  (`components/blog/TableOfContents.tsx`) built from H2s, a product promo card
  (`components/blog/PromoCard.tsx`), an end-of-article CTA, per-post
  `generateMetadata` (canonical `${SITE_URL}/blog/<slug>`, OpenGraph article,
  Twitter summary_large_image), `BlogPosting` JSON-LD, and sitemap inclusion
  (`app/sitemap.ts` enumerates non-draft posts). **No in-article/mid-article
  CTAs** — the rail + end CTA own that.
- **Slug/URL:** `${SITE_URL}/blog/<slug>`; `SITE_URL` = `https://neozino.dev`
  (`lib/site.ts`). Posts are **English** (SEO target market: US/English).
- **Exemplar to read before drafting:**
  `content/blog/how-to-choose-a-freelance-web-developer.mdx`.

## 4. Tools (NOT yet scaffolded)

There is **no `app/tools/` route or tool registry in this repo yet.** The
`seo-tool-validate` workflow expects `localhost:3000/tools/<slug>` and a tools
registry, so a tool build is **blocked until the tools surface is scaffolded**
(an `app/tools/[slug]` route + a registry module + a reference implementation),
mirroring how the blog was scaffolded. Until then, **prefer guide suggestions**;
if a tool idea is compelling, propose it `pending` and note that scaffolding the
tools surface is a prerequisite. Do not attempt a tool build against a
non-existent route.

## 5. Design system

- Tokens: `app/globals.css` `@theme`. Blog uses the **dark "portal" ladder** —
  `--color-portal-canvas #0c0a09`, `-raised #131110`, `-panel #1a1715`,
  `-inset #221d1a`; borders `--color-portal-line` (white/.07) /
  `-line-strong` (/.13); ink `--color-portal-ink #f3ede0`,
  `-muted #a39c92`, `-faint #6f6a62`. Accent `--color-brand-orange #e67e22`;
  clay `--color-clock-clay #c96442`, `--color-cut-clay #d9774f`. (Section
  gradients `--color-{about,portfolio,hiw,contact}-{dark,warm}` exist for the
  freelance pages.)
- Helpers/primitives: `cn()` (`lib/utils.ts`), `Container`
  (`components/ui/Container.tsx`), `Button` (`components/ui/button.tsx`).
- Motion: `lib/motion.ts` (`EASE`, `DUR`, `viewport`, `fadeUp`/`stagger`/…) —
  always guard with `useReducedMotion()`.
- Icons: `@iconify/react` with icon-data imports (sets: lucide, tabler, mdi,
  simple-icons, logos).
- Fonts: Geist (`--font-sans` body); Montserrat/Inter/Jakarta (`lib/fonts.ts`,
  Montserrat is the de-facto UI font); Heebo auto-applies to any `dir="rtl"`
  element via a `globals.css` rule.
- Exemplar visuals: `sections/HeroSection.tsx`, `components/blog/PostCard.tsx`,
  the portal components in `app/page.tsx`.

## 6. Voice & writing rules

- Author attribution: **Neo Zino**. First-person is fine (Neo's own voice).
- **Run every draft through the humanizer skill** (`~/.claude/skills/humanizer/`):
  no em dashes, no hype words, no AI-tells; concrete and plain.
- English posts. When chrome copy is bilingual, add strings to `lib/i18n.ts`
  `blog` namespace (EN+HE) and use logical utilities (`text-start`/`ms-`/`ps-`)
  with `dir="rtl"`; article bodies stay LTR English.

## 7. Analytics

`@vercel/analytics` (`<Analytics/>` in `app/layout.tsx`). No custom blog event
convention. Email capture endpoint: `app/api/subscribe/route.ts`.

## Domain note

`SITE_URL` / `metadataBase` / sitemap now target **https://neozino.dev**
(`lib/site.ts`, `app/layout.tsx`, `app/sitemap.ts`). Confirm the neozino.dev
domain is pointed at this Vercel deployment so canonicals resolve to live pages.
