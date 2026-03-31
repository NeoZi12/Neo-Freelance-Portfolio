"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeUp, fadeLeft, stagger, staggerFast, viewport } from "@/lib/motion";

const skills = [
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "React", icon: "logos:react" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "SQL", icon: "logos:postgresql" },
  { name: "Tailwind", icon: "logos:tailwindcss-icon" },
  { name: "Git", icon: "logos:git-icon" },
  { name: "HTML", icon: "logos:html-5" },
  { name: "CSS", icon: "logos:css-3" },
];

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
          alt="Neo Zino – Freelance Web Developer"
          fill
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

            {/* ── Tech stack — stagger the label then cascade badges ── */}
            <motion.div
              variants={staggerFast}
              className="flex flex-col gap-3 pt-2"
            >
              <motion.span
                variants={fadeUp}
                className="text-white/40 text-xs font-semibold uppercase tracking-widest"
              >
                {t.about.techLabel}
              </motion.span>

              {/* Badges grid: each badge gets its own stagger */}
              <motion.div
                variants={staggerFast}
                className="flex flex-wrap gap-2"
              >
                {skills.map((skill) => (
                  /* Wrapper handles the scroll animation; inner div keeps CSS hover intact */
                  <motion.div key={skill.name} variants={fadeUp}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/70 text-xs font-medium hover:shadow-[0_0_12px_rgba(230,126,34,0.45)] hover:scale-105 hover:border-brand-orange/30 transition-all duration-200 cursor-default">
                      <Icon icon={skill.icon} width={16} height={16} />
                      {skill.name}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
