import type { MDXComponents } from "mdx/types";
import { montserrat, inter } from "@/lib/fonts";
import { slugifyHeading } from "@/lib/blog";
import { cn } from "@/lib/utils";

// ── Article body renderer ───────────────────────────────────────────────────
// Maps raw markdown elements to this site's brand voice: Montserrat for
// headings (matches every other section), Inter for long-form body copy
// (already the site's secondary/body pairing — see ServicesSection).
// No @tailwindcss/typography plugin — hand-styling keeps this on-brand and
// avoids an extra dependency for a handful of element types.

function getTextChild(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextChild).join("");
  return "";
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => {
    const text = getTextChild(children);
    return (
      <h2
        id={slugifyHeading(text)}
        className={cn(
          montserrat.className,
          "scroll-mt-28 text-2xl sm:text-[28px] font-bold text-white leading-tight mt-12 mb-4 first:mt-0",
        )}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3
      className={cn(
        montserrat.className,
        "text-lg sm:text-xl font-semibold text-white leading-snug mt-8 mb-3",
      )}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className={cn(inter.className, "text-[15px] sm:text-base text-white/75 leading-relaxed mb-5")}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className={cn(inter.className, "list-disc marker:text-brand-orange pl-5 space-y-2 text-[15px] sm:text-base text-white/75 leading-relaxed mb-6")}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className={cn(inter.className, "list-decimal marker:text-brand-orange marker:font-semibold pl-5 space-y-2 text-[15px] sm:text-base text-white/75 leading-relaxed mb-6")}>
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1.5">{children}</li>,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  em: ({ children }) => <em className="text-white/90 italic">{children}</em>,
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-brand-orange underline underline-offset-4 decoration-brand-orange/40 hover:decoration-brand-orange transition-colors duration-200"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote
      className={cn(
        montserrat.className,
        "border-s-4 border-brand-orange bg-white/[0.03] rounded-e-lg",
        "px-5 py-4 my-8 text-lg sm:text-xl font-medium text-white leading-snug italic",
      )}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-t border-white/10 my-10" />,
  code: ({ children }) => (
    <code className="font-mono text-[0.85em] text-orange-200 bg-white/[0.06] border border-white/10 rounded px-1.5 py-0.5">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="font-mono text-[13px] leading-relaxed text-white/85 bg-[#0d0a08] border border-white/10 rounded-xl p-4 overflow-x-auto mb-6">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
      <table className={cn(inter.className, "w-full text-sm text-start")}>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/[0.04]">{children}</thead>,
  th: ({ children }) => (
    <th className={cn(montserrat.className, "text-start text-white font-semibold px-4 py-3 whitespace-nowrap")}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-white/70 px-4 py-3 border-t border-white/[0.06] align-top">{children}</td>
  ),
};
