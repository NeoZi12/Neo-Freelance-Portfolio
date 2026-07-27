import type { Heading } from "@/lib/blog";

/**
 * Desktop-only "On this page" rail — hidden on mobile by the parent <aside>.
 * Pure anchor links, no scroll-spy JS: keeps the detail page a Server
 * Component with zero extra client bundle for a feature that's a nice-to-have
 * past "jump to section."
 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="rounded-2xl border border-white/10 bg-card-dark/60 p-5">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
        On this page
      </p>
      <ul className="space-y-2.5 border-s border-white/10 ps-4">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="block text-sm leading-snug text-white/60 transition-colors duration-200 hover:text-brand-orange"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
