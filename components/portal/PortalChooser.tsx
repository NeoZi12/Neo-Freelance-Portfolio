"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import MakerColumn from "./MakerColumn";
import ProductCard from "./ProductCard";
import ClockedCodeMark from "./ClockedCodeMark";
import UsageCutMark from "./UsageCutMark";
import UsageCutPreview from "./UsageCutPreview";

const CLOCKEDCODE_URL = "https://clockedcode.com";
// UsageCut has no confirmed production URL in the codebase yet.
// TODO: confirm live UsageCut URL — one-line swap.
const USAGECUT_URL = "https://usagecut.com";

/**
 * The portal hub (Marc Lou model, dark): a maker-identity column on the left,
 * the two products on the right. Holds which card is hovered so the unchosen
 * one recedes (sibling-dim). Reduced-motion guarded throughout.
 */
export default function PortalChooser() {
  const prefersReducedMotion = useReducedMotion();
  // null = neither hovered; 0 = ClockedCode; 1 = UsageCut.
  const [active, setActive] = useState<number | null>(null);

  const container: Variants = {
    hidden: {},
    show: {
      transition: prefersReducedMotion
        ? {}
        : { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-14"
    >
      {/* ── Maker anchor ─────────────────────────────────────────────── */}
      <motion.div variants={item} className="lg:col-span-5">
        <MakerColumn />
      </motion.div>

      {/* ── The two destinations ─────────────────────────────────────── */}
      <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-7">
        <ProductCard
          href={CLOCKEDCODE_URL}
          name="ClockedCode"
          mark={<ClockedCodeMark size={28} gradientId="cc-card-gauge" />}
          pitch="A curated stack, a tuned CLAUDE.md, and a one-paste installer — stock install to full power."
          cta="Open ClockedCode"
          accent="var(--color-clock-clay)"
          dimmed={active === 1}
          preview={
            <div className="relative h-40 sm:h-44">
              <Image
                src="/portal/clockedcode-dashboard.png"
                alt="ClockedCode dashboard"
                width={2304}
                height={1212}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--color-portal-inset), transparent 55%)",
                }}
              />
            </div>
          }
          onPointerEnter={() => setActive(0)}
          onPointerLeave={() => setActive(null)}
        />

        <ProductCard
          href={USAGECUT_URL}
          name={
            <span style={{ letterSpacing: "-0.035em" }}>
              Usage
              <span style={{ color: "var(--color-cut-clay)", fontWeight: 800 }}>
                Cut
              </span>
            </span>
          }
          mark={<UsageCutMark size={26} />}
          pitch="A free local scan finds the tokens you waste, then trims them — lossless, reversible, all on your machine."
          cta="Enter UsageCut"
          accent="var(--color-cut-clay)"
          dimmed={active === 0}
          preview={<UsageCutPreview />}
          onPointerEnter={() => setActive(1)}
          onPointerLeave={() => setActive(null)}
        />
      </div>
    </motion.div>
  );
}
