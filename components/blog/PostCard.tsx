import Link from "next/link";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts";
import type { PostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/format";

/**
 * One entry in the blog index — a hairline-separated row, not a boxed card.
 * The date is the structural anchor on the rail (real metadata, so no
 * decorative numbering); the clay rim + arrow ignite on hover/focus, echoing
 * the portal's ProductCard. CSS-only interaction so the index ships zero JS.
 */
export default function PostCard({
  post,
  href,
  readLabel,
  minReadLabel,
  locale,
}: {
  post: PostMeta;
  href: string;
  readLabel: string;
  minReadLabel: string;
  locale: string;
}) {
  const { day, month, year } = formatPostDate(post.date, locale);

  return (
    <Link
      href={href}
      className={cn(
        "group relative grid grid-cols-1 gap-x-8 gap-y-3 rounded-2xl px-4 py-6 sm:grid-cols-[7rem_1fr] sm:px-6 sm:py-7",
        "outline-none transition-colors duration-200",
        "hover:bg-portal-raised focus-visible:bg-portal-raised",
        "focus-visible:ring-2 focus-visible:ring-brand-orange/70 focus-visible:ring-offset-2 focus-visible:ring-offset-portal-canvas",
      )}
    >
      {/* Rim glow — ignites on hover/focus (edge only, like ProductCard). */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
        style={{
          border: "1px solid color-mix(in oklab, var(--color-brand-orange) 45%, transparent)",
        }}
      />

      {/* Date rail */}
      <div className={cn("flex items-baseline gap-2 sm:flex-col sm:items-start sm:gap-0.5", montserrat.className)}>
        <span className="text-2xl font-bold leading-none text-portal-ink tabular-nums sm:text-3xl">
          {day}
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-portal-faint">
          {month} {year}
        </span>
      </div>

      {/* Body */}
      <div className="relative min-w-0">
        <h2 className="text-balance text-xl font-bold tracking-tight text-portal-ink transition-colors group-hover:text-white sm:text-2xl">
          {post.title}
        </h2>

        <p className="mt-2 max-w-[62ch] text-pretty text-[0.95rem] leading-relaxed text-portal-muted">
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Topics">
              {post.tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-portal-line bg-portal-inset px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-portal-faint"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <span className="text-xs font-medium text-portal-faint">
            {post.readingTime} {minReadLabel}
          </span>

          <span
            className={cn(
              "ms-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange",
              "opacity-0 transition-opacity duration-200 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100",
            )}
          >
            {readLabel}
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
