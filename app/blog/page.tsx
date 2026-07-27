import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { montserrat, inter } from "@/lib/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PostCard, FeaturedPostCard } from "@/components/blog/PostCard";
import { getAllPostsMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Neo Zino — Freelance Web Developer",
  description:
    "Practical guides on building websites and hiring the right developer — written from the freelance seat.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main
        className={cn(
          "min-h-[100dvh] bg-gradient-to-b from-blog-dark to-blog-warm",
          montserrat.className,
        )}
      >
        {/* Spacer matching the fixed navbar height */}
        <div className="h-[64px] lg:h-[90px] shrink-0" />

        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-14 sm:px-10 sm:pt-20 lg:px-8 lg:pt-24 xl:px-0">
          {/* ── Header ── */}
          <header className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
              Writing
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[44px]">
              Building websites, hiring developers —{" "}
              <span className="text-brand-orange">the parts that actually matter.</span>
            </h1>
            <p className={cn(inter.className, "mt-4 text-base leading-relaxed text-white/60")}>
              Practical write-ups for anyone about to build a site, or hire someone to build it.
            </p>
          </header>

          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

          {/* ── Posts ── */}
          {posts.length === 0 ? (
            <p className={cn(inter.className, "mt-16 text-white/50")}>
              First post is on the way — check back soon.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <FeaturedPostCard post={featured} />
                </div>
              )}
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
}
