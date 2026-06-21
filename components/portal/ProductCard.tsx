"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A destination card in the products portal. The whole card is one <a> — a real
 * navigation link. Marc-Lou-inspired: a small mark + name + one line, then a
 * real product visual (`preview`) so the card shows the product, not just text.
 * Hover/focus is the "choosing" feel — the active card lifts and its rim ignites
 * in the product's clay, while the sibling recedes (via `dimmed`).
 *
 * Depth is elevation + a hairline rim, never a drop shadow.
 */
export type ProductCardProps = {
  href: string;
  /** Opens in a new tab when true (external product sites). */
  external?: boolean;
  /** Not yet launched — render as a non-clickable card with a "coming soon" cue. */
  comingSoon?: boolean;
  /** The product name, rendered as an <h2>. Pass the styled wordmark. */
  name: ReactNode;
  /** The mark (gauge / trimmed-stack), on its own accent-tinted plate. */
  mark: ReactNode;
  /** One supporting sentence. */
  pitch: string;
  /** CTA label. The arrow is appended automatically. */
  cta: string;
  /** This card's clay accent (resolved CSS color). */
  accent: string;
  /** True when the *other* card is hovered — recede this one. */
  dimmed: boolean;
  /** The product visual (framed screenshot / widget) shown in the card. */
  preview: ReactNode;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

export default function ProductCard({
  href,
  external = true,
  comingSoon = false,
  name,
  mark,
  pitch,
  cta,
  accent,
  dimmed,
  preview,
  onPointerEnter,
  onPointerLeave,
}: ProductCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardEntrance: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const lift = prefersReducedMotion || comingSoon ? {} : { y: -4 };

  // Coming-soon cards are not navigable: render as a non-interactive container
  // (no href, no hover-lift) so it announces "not yet available" rather than a link.
  const Tag = comingSoon ? motion.div : motion.a;
  const interactiveProps = comingSoon
    ? { "aria-disabled": true as const }
    : {
        href,
        ...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
        onFocus: onPointerEnter,
        onBlur: onPointerLeave,
        whileHover: lift,
        whileFocus: lift,
      };

  return (
    <Tag
      {...interactiveProps}
      variants={cardEntrance}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ "--accent": accent } as React.CSSProperties}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-3xl",
        "border border-portal-line bg-portal-raised",
        "p-6 sm:p-7",
        "outline-none transition-[border-color,background-color,opacity] duration-200",
        comingSoon
          ? "cursor-default"
          : [
              "hover:border-portal-line-strong hover:bg-portal-panel",
              "focus-visible:border-portal-line-strong focus-visible:bg-portal-panel",
              "focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-portal-canvas",
            ],
        dimmed && "opacity-60",
      )}
    >
      {/* Rim glow — ignites on hover/focus. Glows the EDGE, not the whole card. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-200",
          "group-hover/card:opacity-100 group-focus-visible/card:opacity-100",
        )}
        style={{
          border: "1px solid color-mix(in oklab, var(--accent) 55%, transparent)",
          boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--accent) 20%, transparent)",
        }}
      />

      {/* Signature corner bloom — one soft clay moment, on hover only. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 end-[-6rem] h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-300",
          "group-hover/card:opacity-35 group-focus-visible/card:opacity-35",
        )}
        style={{ background: "var(--accent)" }}
      />

      <div className="relative flex flex-1 flex-col">
        {/* Header — mark + name */}
        <div className="flex items-center gap-3.5">
          <span
            className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border"
            style={{
              background: "color-mix(in oklab, var(--accent) 12%, var(--color-portal-inset))",
              borderColor: "color-mix(in oklab, var(--accent) 26%, transparent)",
            }}
          >
            {mark}
          </span>
          <h2 className="text-xl font-semibold tracking-tight text-portal-ink sm:text-2xl">
            {name}
          </h2>
          {comingSoon && (
            <span
              className="ms-auto inline-flex flex-none items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-portal-muted"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--accent) 30%, transparent)",
                background:
                  "color-mix(in oklab, var(--accent) 10%, var(--color-portal-inset))",
              }}
            >
              Coming soon
            </span>
          )}
        </div>

        <p className="mt-3.5 max-w-[46ch] text-pretty text-sm leading-relaxed text-portal-muted sm:text-[0.95rem]">
          {pitch}
        </p>

        {/* The product visual */}
        <div className="relative mt-5 overflow-hidden rounded-xl border border-portal-line bg-portal-inset">
          {preview}
        </div>

        {/* CTA pill (a visual cue — the whole card is the link). */}
        <div className="mt-5">
          {comingSoon ? (
            <span
              className={cn(
                "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2",
                "border border-portal-line bg-portal-inset",
                "text-sm font-semibold text-portal-muted",
              )}
            >
              {cta}
            </span>
          ) : (
            <span
              className={cn(
                "inline-flex w-fit items-center gap-2 rounded-full px-4 py-2",
                "border border-portal-line-strong bg-portal-inset",
                "text-sm font-semibold text-portal-ink transition-colors duration-200",
                "group-hover/card:border-[var(--accent)] group-focus-visible/card:border-[var(--accent)]",
              )}
            >
              {cta}
              <span
                aria-hidden
                className={cn(
                  "transition-transform duration-200 ease-out",
                  "group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1",
                  "motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0",
                )}
                style={{ color: "var(--accent)" }}
              >
                →
              </span>
            </span>
          )}
        </div>
      </div>
    </Tag>
  );
}
