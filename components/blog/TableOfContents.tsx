"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/blog";

/**
 * "On this page" rail. Highlights the section currently in view with a clay
 * active-bar. The IntersectionObserver only reads scroll position and sets
 * state — no animation — so it's inherently reduced-motion safe; the smooth
 * scroll on click is suppressed when the user prefers reduced motion.
 */
export default function TableOfContents({
  headings,
  label,
  isHe,
}: {
  headings: Heading[];
  label: string;
  isHe: boolean;
}) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost heading currently intersecting the trigger band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Trigger band sits just below the navbar; -70% bottom means a heading is
      // "active" from when it clears the navbar until the next one arrives.
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  if (headings.length === 0) return null;

  return (
    <nav aria-label={label} dir={isHe ? "rtl" : "ltr"}>
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-portal-faint">
        {label}
      </p>
      <ul className="space-y-0.5 border-s border-portal-line">
        {headings.map(({ id, text, level }) => {
          const active = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={cn(
                  "-ms-px block border-s-2 py-1.5 text-[0.82rem] leading-snug transition-colors",
                  level === 3 ? "ps-6" : "ps-4",
                  active
                    ? "border-brand-orange font-medium text-portal-ink"
                    : "border-transparent text-portal-faint hover:border-portal-line-strong hover:text-portal-muted",
                )}
                aria-current={active ? "location" : undefined}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
