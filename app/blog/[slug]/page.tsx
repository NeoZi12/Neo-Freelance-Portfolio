import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts";
import { translations, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { getAllSlugs, getPostBySlug, getHeadings } from "@/lib/blog";
import { formatFullDate } from "@/lib/format";
import { mdxComponents } from "@/components/blog/mdx-components";
import TableOfContents from "@/components/blog/TableOfContents";
import PromoCard from "@/components/blog/PromoCard";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ lang?: string }>;

function resolveLocale(lang?: string): Locale {
  return lang === "he" ? "he" : "en";
}

function withLang(path: string, locale: Locale): string {
  return locale === "he" ? `${path}?lang=he` : path;
}

/** Absolute URL for a cover path (metadataBase-relative would also work, but
 *  JSON-LD needs a fully-qualified image, so resolve it here). */
function absoluteCover(cover?: string): string | undefined {
  if (!cover) return undefined;
  return cover.startsWith("http") ? cover : `${SITE_URL}${cover}`;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${slug}`;
  const cover = absoluteCover(post.cover);
  const title = `${post.title} | Neo Zino`;

  return {
    title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      siteName: "Neo Zino",
      publishedTime: post.date,
      authors: [post.author],
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const isHe = locale === "he";
  const t = translations[locale].blog;

  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  const headings = getHeadings(post.content);
  const url = `${SITE_URL}/blog/${slug}`;
  const cover = absoluteCover(post.cover);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    ...(cover ? { image: cover } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <div className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", montserrat.className)}>
      {/* ── Top: back to blog ──────────────────────────────────────────── */}
      <div dir={isHe ? "rtl" : "ltr"} className="pt-10 sm:pt-14">
        <Link
          href={withLang("/blog", locale)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-portal-faint transition-colors hover:text-brand-orange"
        >
          <span aria-hidden className={cn(isHe && "rotate-180")}>
            ←
          </span>
          {t.backToBlog}
        </Link>
      </div>

      {/* ── Article header ─────────────────────────────────────────────── */}
      <header dir={isHe ? "rtl" : "ltr"} className="border-b border-portal-line py-8 sm:py-10">
        {post.tags.length > 0 && (
          <ul className="mb-5 flex flex-wrap gap-2" aria-label="Topics">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-portal-line bg-portal-inset px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-brand-orange/90"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <h1 className="text-balance text-3xl font-bold leading-[1.15] tracking-tight text-portal-ink sm:text-[2.7rem]">
          {post.title}
        </h1>

        <p className="mt-4 max-w-[60ch] text-pretty text-lg leading-relaxed text-portal-muted">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-portal-faint">
          <span className="font-medium text-portal-muted">{post.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatFullDate(post.date, locale)}</time>
          <span aria-hidden>·</span>
          <span>
            {post.readingTime} {t.minRead}
          </span>
        </div>
      </header>

      {/* ── Reading rail: article + sticky aside ───────────────────────── */}
      <div className="py-10 sm:py-12 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start lg:gap-12 xl:gap-16">
        {/* Article body — always LTR English content */}
        <article dir="ltr" className="min-w-0 max-w-[68ch] text-left">
          <MDXRemote source={post.content} components={mdxComponents} />

          {/* End-of-article CTA — the template owns this, not inline CTAs. */}
          <aside
            dir={isHe ? "rtl" : "ltr"}
            className="mt-14 overflow-hidden rounded-2xl border border-portal-line bg-portal-raised p-6 sm:p-8"
          >
            <div className="mb-4 h-[2px] w-10 rounded-full bg-brand-orange" />
            <p className="text-xl font-bold tracking-tight text-portal-ink">
              {t.ctaTitle}
            </p>
            <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-portal-muted">
              {t.ctaPitch}
            </p>
            <Link
              href={withLang("/contact", locale)}
              className={cn(
                "group mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5",
                "bg-brand-orange text-sm font-semibold text-white",
                "transition-shadow duration-200 hover:shadow-[0_10px_24px_rgba(230,126,34,0.35)]",
              )}
            >
              {t.ctaButton}
              <span
                aria-hidden
                className={cn(
                  "transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
                  isHe && "rotate-180",
                )}
              >
                →
              </span>
            </Link>
          </aside>

          <div dir={isHe ? "rtl" : "ltr"} className="mt-10">
            <Link
              href={withLang("/blog", locale)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-portal-muted transition-colors hover:text-brand-orange"
            >
              <span aria-hidden className={cn(isHe && "rotate-180")}>
                ←
              </span>
              {t.backToBlog}
            </Link>
          </div>
        </article>

        {/* Sticky rail — desktop only. items-start on the grid keeps this cell
            content-height so `sticky` has room to travel as the article scrolls. */}
        <aside
          dir={isHe ? "rtl" : "ltr"}
          className="hidden lg:sticky lg:top-[110px] lg:block"
        >
          <TableOfContents headings={headings} label={t.onThisPage} isHe={isHe} />
          <PromoCard
            className="mt-8"
            title={t.promoTitle}
            pitch={t.promoPitch}
            cta={t.promoCta}
            href={withLang("/", locale)}
          />
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
