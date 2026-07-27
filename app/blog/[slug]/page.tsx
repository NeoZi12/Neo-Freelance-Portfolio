import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { PromoCard } from "@/components/blog/PromoCard";
import { mdxComponents } from "@/lib/mdx-components";
import { getAllPostSlugs, getPostBySlug, formatPostDate } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Neo Zino`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
  };

  return (
    <>
      <Navbar />
      <main
        className={cn(
          "min-h-[100dvh] bg-gradient-to-b from-blog-dark to-blog-warm",
          montserrat.className,
        )}
      >
        <div className="h-[64px] lg:h-[90px] shrink-0" />

        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-10 sm:pt-14 lg:px-8 xl:px-0">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors duration-200 hover:text-brand-orange"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            All articles
          </Link>

          {/* ── Header ── */}
          <header className="mt-6 max-w-3xl">
            {post.tags[0] && (
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                {post.tags[0]}
              </p>
            )}
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[42px]">
              {post.title}
            </h1>
            <p className="mt-4 text-sm uppercase tracking-wider text-white/40">
              {formatPostDate(post.date)} <span aria-hidden="true">·</span> {post.readingTime} min read{" "}
              <span aria-hidden="true">·</span> {post.author}
            </p>
          </header>

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

          {/* ── Article + sidebar ──
              No `items-start` on this grid — the default `stretch` alignment
              lets the aside's grid cell match the (tall) article cell's
              height, which is exactly what gives the sticky ToC room to
              travel while the article scrolls past it. Adding items-start
              would shrink the aside to its own content height and the sticky
              pin would disengage almost immediately. */}
          <div className="mt-10 grid grid-cols-1 items-stretch gap-x-16 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
            <article className="min-w-0 max-w-3xl">
              <MDXRemote source={post.content} components={mdxComponents} />
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6">
                <TableOfContents headings={post.headings} />
                <PromoCard />
              </div>
            </aside>
          </div>
        </div>

        <Footer />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
