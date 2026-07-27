import Link from "next/link";
import { cn } from "@/lib/utils";
import { montserrat, inter } from "@/lib/fonts";
import { formatPostDate, type PostMeta } from "@/lib/blog";

// Pure Server Component, CSS-only hover states — no framer-motion here.
// A grid that will hold 20+ cards within months stays a plain hairline
// border at rest (the site's always-on orange ring works for a 5-item
// portfolio, not a growing content grid); the brand ring shows up on
// hover/focus instead, so the punch is earned, not ambient.

function CardChrome({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-white/10 bg-card-dark/60 p-6",
        "transition-colors duration-300 ease-out",
        "hover:border-brand-orange/50 hover:bg-card-dark",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange focus-visible:outline-offset-2",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function MetaRow({ date, readingTime }: { date: string; readingTime: number }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
      <span className="text-xs uppercase tracking-wider text-white/40">
        {formatPostDate(date)} <span aria-hidden="true">·</span> {readingTime} min read
      </span>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-orange">
        Read
        <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </span>
    </div>
  );
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <CardChrome href={`/blog/${post.slug}`}>
      {post.tags[0] && (
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange">
          {post.tags[0]}
        </span>
      )}
      <h3
        className={cn(
          montserrat.className,
          "mt-2.5 text-lg font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-brand-orange",
          "line-clamp-2",
        )}
      >
        {post.title}
      </h3>
      <p className={cn(inter.className, "mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-white/60")}>
        {post.description}
      </p>
      <MetaRow date={post.date} readingTime={post.readingTime} />
    </CardChrome>
  );
}

/** The single newest post gets a wider, larger-type treatment above the grid. */
export function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <CardChrome href={`/blog/${post.slug}`} className="sm:p-8">
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-orange">
        Latest{post.tags[0] ? ` · ${post.tags[0]}` : ""}
      </span>
      <h3
        className={cn(
          montserrat.className,
          "mt-3 text-2xl font-bold leading-tight text-white transition-colors duration-200 group-hover:text-brand-orange sm:text-[28px]",
        )}
      >
        {post.title}
      </h3>
      <p className={cn(inter.className, "mt-3 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-base")}>
        {post.description}
      </p>
      <MetaRow date={post.date} readingTime={post.readingTime} />
    </CardChrome>
  );
}
