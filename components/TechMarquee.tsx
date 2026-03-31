"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { fadeUp } from "@/lib/motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Tech = { name: string; icon: string; style?: React.CSSProperties };

const TECHS: Tech[] = [
  { name: "HTML5",        icon: "logos:html-5" },
  { name: "CSS3",         icon: "logos:css-3" },
  { name: "JavaScript",   icon: "logos:javascript" },
  { name: "TypeScript",   icon: "logos:typescript-icon" },
  { name: "React",        icon: "logos:react" },
  { name: "Next.js",      icon: "logos:nextjs-icon" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
  { name: "Node.js",      icon: "logos:nodejs-icon" },
  // PostgreSQL — the gray elephant icon
  { name: "PostgreSQL",   icon: "logos:postgresql" },
  { name: "Git",          icon: "logos:git-icon" },
  // mdi:github uses currentColor — force white so it's visible on dark bg
  { name: "GitHub",       icon: "mdi:github", style: { color: "#ffffff" } },
  { name: "Vercel",       icon: "logos:vercel-icon" },
  // simple-icons:sanity renders in Sanity's brand red (#F03E2F)
  { name: "Sanity",       icon: "simple-icons:sanity", style: { color: "#F03E2F" } },
  { name: "Figma",        icon: "logos:figma" },
];

// ── Single icon with tooltip ──────────────────────────────────────────────────
function TechIcon({ name, icon, style }: Tech) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip — fades in above the icon */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 pointer-events-none z-20 whitespace-nowrap"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-white/70 bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm">
              {name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon — scales and brightens on hover */}
      <motion.div
        className="cursor-pointer select-none"
        animate={
          hovered
            ? { scale: 1.18, filter: "brightness(1.25)" }
            : { scale: 1,    filter: "brightness(0.85)" }
        }
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Icon icon={icon} className="w-9 h-9 sm:w-11 sm:h-11" style={style} aria-hidden="true" />
      </motion.div>
    </div>
  );
}

// ── TechMarquee ───────────────────────────────────────────────────────────────
interface TechMarqueeProps {
  label: string;
}

export default function TechMarquee({ label }: TechMarqueeProps) {
  const { locale } = useLanguage();
  const isHe = locale === "he";
  // overflow-x: clip (not hidden) clips horizontally without creating a scroll
  // container — this keeps overflow-y: visible so tooltips can escape upward.
  // Both mask prefixes required for Safari.
  const maskStyle = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, black 72px, black calc(100% - 72px), transparent 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0%, black 72px, black calc(100% - 72px), transparent 100%)",
  } as React.CSSProperties;

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-3 pt-8 w-full"
    >
      <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
        {label}
      </span>

      {/*
        [overflow-x:clip] clips the scrolling track horizontally while
        leaving overflow-y: visible so tooltips positioned above icons
        are never cut off. pt-12 gives headroom for the tooltip + animation.
      */}
      <div
        className="relative w-full [overflow-x:clip] pt-9 pb-3"
        style={maskStyle}
        dir="ltr"
        role="region"
        aria-label={label}
      >
        {/* Track: items rendered twice for seamless translateX(-50%) loop.
            dir="ltr" on the parent ensures flex always lays out L→R regardless
            of page locale, so the -50% translateX trick works correctly.
            RTL uses the reversed keyframe (starts at -50%, ends at 0). */}
        <div
          className={isHe ? "marquee-track-rtl flex items-center gap-x-6 sm:gap-x-8 w-max" : "marquee-track flex items-center gap-x-6 sm:gap-x-8 w-max"}
          aria-hidden="true"
        >
          {TECHS.map((tech) => (
            <TechIcon key={tech.name} {...tech} />
          ))}
          {TECHS.map((tech) => (
            <TechIcon key={`${tech.name}-dup`} {...tech} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
