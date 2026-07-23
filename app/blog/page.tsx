import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts";
import { translations, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";

type SearchParams = Promise<{ lang?: string }>;

function resolveLocale(lang?: string): Locale {
  return lang === "he" ? "he" : "en";
}

/** Carry the active language on internal links so chrome locale is preserved. */
function withLang(path: string, locale: Locale): string {
  return locale === "he" ? `${path}?lang=he` : path;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const t = translations[locale].blog;
  const title = `${t.indexTitle} | Neo Zino`;

  return {
    title,
    description: t.indexIntro,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      title,
      description: t.indexIntro,
      url: `${SITE_URL}/blog`,
      type: "website",
      siteName: "Neo Zino",
    },
    twitter: { card: "summary_large_image", title, description: t.indexIntro },
  };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { lang } = await searchParams;
  const locale = resolveLocale(lang);
  const isHe = locale === "he";
  const t = translations[locale].blog;
  const posts = getAllPosts();

  return (
    <div
      dir={isHe ? "rtl" : "ltr"}
      className={cn("mx-auto w-full max-w-4xl px-5 sm:px-8", montserrat.className)}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="pt-14 pb-10 sm:pt-20 sm:pb-14">
        <Link
          href={withLang("/", locale)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-portal-faint transition-colors hover:text-brand-orange"
        >
          <span aria-hidden className={cn(isHe && "rotate-180")}>
            ←
          </span>
          {t.backToSite}
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-portal-ink sm:text-5xl">
          {t.indexTitle}
        </h1>
        <p className="mt-4 max-w-[56ch] text-pretty text-base leading-relaxed text-portal-muted sm:text-lg">
          {t.indexIntro}
        </p>
      </header>

      {/* ── List ───────────────────────────────────────────────────────── */}
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-portal-line-strong bg-portal-raised/40 px-6 py-16 text-center">
          <p className="text-portal-muted">{t.empty}</p>
        </div>
      ) : (
        <ul className="divide-y divide-portal-line border-t border-portal-line pb-24">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard
                post={post}
                href={withLang(`/blog/${post.slug}`, locale)}
                readLabel={t.readArticle}
                minReadLabel={t.minRead}
                locale={locale}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
