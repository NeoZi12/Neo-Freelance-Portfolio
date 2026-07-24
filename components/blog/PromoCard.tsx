import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Small product promo beneath the ToC rail — ties an article back to the maker.
 * Brand tokens only; the clay accent stays quiet (one hairline + one link).
 */
export default function PromoCard({
  title,
  pitch,
  cta,
  href,
  className,
}: {
  title: string;
  pitch: string;
  cta: string;
  href: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-portal-line bg-portal-raised p-5",
        className,
      )}
    >
      <div className="mb-3 h-[2px] w-8 rounded-full bg-brand-orange" />
      <p className="text-sm font-semibold text-portal-ink">{title}</p>
      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-portal-muted">
        {pitch}
      </p>
      <Link
        href={href}
        className="group mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-brand-orange"
      >
        {cta}
        <span
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        >
          →
        </span>
      </Link>
    </div>
  );
}
