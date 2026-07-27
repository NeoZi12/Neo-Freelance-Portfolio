import Link from "next/link";
import { montserrat, inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/** One-line service pitch under the ToC — the reason this blog exists. */
export function PromoCard() {
  return (
    <div className="rounded-2xl border border-brand-orange/25 bg-gradient-to-b from-blog-warm/50 to-card-dark/60 p-5">
      <p className={cn(montserrat.className, "text-sm font-semibold leading-snug text-white")}>
        Need a developer who ships fast and explains clearly?
      </p>
      <p className={cn(inter.className, "mt-2 text-xs leading-relaxed text-white/60")}>
        I build landing pages, portfolios, and full-stack websites for founders and small teams.
      </p>
      <Link
        href="/contact?lang=en"
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange"
      >
        Get in touch
        <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}
