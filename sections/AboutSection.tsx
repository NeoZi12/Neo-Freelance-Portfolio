"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeUp, fadeLeft, stagger, viewport } from "@/lib/motion";
import TechMarquee from "@/components/TechMarquee";
import { montserrat } from "@/lib/fonts";

// ── Photo frame helper ────────────────────────────────────────────────────────

function PhotoFrame({
  photoW,
  photoH,
  frameW,
  frameH,
  offsetX,
  offsetY,
}: {
  photoW: number;
  photoH: number;
  frameW: number;
  frameH: number;
  offsetX: number;
  offsetY: number;
}) {
  return (
    <div
      className="relative"
      style={{ width: photoW + offsetX, height: photoH + offsetY }}
    >
      {/* Orange decorative border — bottom-left, behind the photo */}
      <div
        className="absolute bottom-0 left-0 border-[16px] border-[#E67E22] rounded-[24px] z-[1]"
        style={{ width: frameW, height: frameH }}
      />

      {/* Photo — top-right, in front of the orange frame */}
      <div
        className="absolute top-0 right-0 rounded-[24px] overflow-hidden z-[2]"
        style={{ width: photoW, height: photoH }}
      >
        <Image
          src="/images/about-pic.jpg"
          alt="Photo of Neo Zino, freelance web developer"
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

// Splits `text` around each phrase in order and wraps matches in orange spans.
function withHighlights(text: string, phrases: readonly string[]) {
  const nodes: React.ReactNode[] = [];
  let remaining = text;
  for (const phrase of phrases) {
    const idx = remaining.indexOf(phrase);
    if (idx === -1) continue;
    if (idx > 0) nodes.push(remaining.slice(0, idx));
    nodes.push(
      <span key={phrase} className="text-[#E67E22]">
        {phrase}
      </span>,
    );
    remaining = remaining.slice(idx + phrase.length);
  }
  if (remaining) nodes.push(remaining);
  return nodes;
}

export default function AboutSection() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";

  return (
    <section
      id="about"
      className={cn(
        "w-full min-h-screen flex flex-col scroll-mt-16 lg:scroll-mt-0",
        "bg-gradient-to-b from-about-dark to-about-warm",
        montserrat.className,
      )}
    >
      <div className="hidden lg:block h-[90px] shrink-0" />

      <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-[130px] py-16 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center w-full">
          {/* ── Left on desktop (photo) — below text on mobile ── */}
          {/* Fades in from the left — it IS the left column */}
          <motion.div
            className="flex items-center justify-center order-2 lg:order-1"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <div className="lg:hidden">
              <PhotoFrame
                photoW={310}
                photoH={430}
                frameW={307}
                frameH={428}
                offsetX={29}
                offsetY={30}
              />
            </div>
            <div className="hidden lg:block">
              <PhotoFrame
                photoW={310}
                photoH={430}
                frameW={307}
                frameH={428}
                offsetX={29}
                offsetY={29}
              />
            </div>
          </motion.div>

          {/* ── Right on desktop (text) — above photo on mobile ── */}
          {/* Stagger container: each top-level child fades up in sequence */}
          <motion.div
            className={cn(
              "flex flex-col gap-4 order-1 lg:order-2 lg:px-[50px] [filter:drop-shadow(0px_4px_4px_rgba(0,0,0,0.25))]",
              isHe && "text-right",
            )}
            dir={isHe ? "rtl" : "ltr"}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-[50px] font-semibold text-white leading-tight"
            >
              {t.about.title1}{" "}
              <span className="text-[#E67E22]">{t.about.title2}</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm lg:text-[15px] font-medium text-white/90 max-w-[484px] leading-relaxed"
            >
              {withHighlights(t.about.description, t.about.descHighlights)}
            </motion.p>

            {/* ── Tech Marquee — fades up on scroll, then runs continuously ── */}
            <TechMarquee label={t.about.techLabel} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
