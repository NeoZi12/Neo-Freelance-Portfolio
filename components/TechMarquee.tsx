"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import type { IconifyIcon } from "@iconify/react";
import { fadeUp } from "@/lib/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import html5 from "@iconify-icons/logos/html-5";
import css3 from "@iconify-icons/logos/css-3";
import javascript from "@iconify-icons/logos/javascript";
import typescriptIcon from "@iconify-icons/logos/typescript-icon";
import react from "@iconify-icons/logos/react";
import nextjsIcon from "@iconify-icons/logos/nextjs-icon";
import tailwindcssIcon from "@iconify-icons/logos/tailwindcss-icon";
import nodejsIcon from "@iconify-icons/logos/nodejs-icon";
import postgresql from "@iconify-icons/logos/postgresql";
import gitIcon from "@iconify-icons/logos/git-icon";
import githubIcon from "@iconify-icons/mdi/github";
import vercelIcon from "@iconify-icons/logos/vercel-icon";
import sanitySimple from "@iconify-icons/simple-icons/sanity";
import figma from "@iconify-icons/logos/figma";

type Tech = { name: string; icon: IconifyIcon; style?: React.CSSProperties };

const TECHS: Tech[] = [
  { name: "HTML5",        icon: html5 },
  { name: "CSS3",         icon: css3 },
  { name: "JavaScript",   icon: javascript },
  { name: "TypeScript",   icon: typescriptIcon },
  { name: "React",        icon: react },
  { name: "Next.js",      icon: nextjsIcon },
  { name: "Tailwind CSS", icon: tailwindcssIcon },
  { name: "Node.js",      icon: nodejsIcon },
  { name: "PostgreSQL",   icon: postgresql },
  { name: "Git",          icon: gitIcon },
  // mdi:github uses currentColor — force white so it's visible on dark bg
  { name: "GitHub",       icon: githubIcon, style: { color: "#ffffff" } },
  { name: "Vercel",       icon: vercelIcon },
  // Sanity's brand red (#F03E2F)
  { name: "Sanity",       icon: sanitySimple, style: { color: "#F03E2F" } },
  { name: "Figma",        icon: figma },
];

// ── Single icon with tooltip ──────────────────────────────────────────────────
type TechIconProps = Tech & { isActive: boolean; onTap: (name: string) => void };

function TechIcon({ name, icon, style, isActive, onTap }: TechIconProps) {
  const [hovered, setHovered] = useState(false);
  // Track the pointer type at the moment of pointerdown so onClick can
  // distinguish a touch tap from a mouse click without calling preventDefault
  // (which can suppress scroll on some browsers).
  const lastPointerType = useRef<string>("");

  // Tooltip and scale state: visible on desktop hover OR mobile active tap
  const visible = hovered || isActive;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip — fades in above the icon */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 pointer-events-none z-20 whitespace-nowrap"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-white/70 bg-neutral-900/90 border border-white/[0.12]">
              {name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon — scales and dims on idle, full opacity on hover/active.
          `tech-icon` class lets CSS reset brightness on touch devices.
          onPointerDown records pointer type; onClick acts on it for touch taps. */}
      <motion.div
        className="tech-icon cursor-pointer select-none"
        animate={
          visible
            ? { scale: 1.18, opacity: 1 }
            : { scale: 1,    opacity: 0.75 }
        }
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onPointerDown={(e) => { lastPointerType.current = e.pointerType; }}
        onClick={() => {
          // Only handle tap on touch — desktop hover already covers mouse interaction
          if (lastPointerType.current === "touch") onTap(name);
        }}
      >
        {/* Mobile: w-8 h-8 (32 px). sm+: w-11 h-11 (44 px). */}
        <Icon icon={icon} className="w-8 h-8 sm:w-11 sm:h-11" style={style} aria-hidden="true" />
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

  // Mobile tap state: which icon (by name) is currently active. null = none.
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  // Ref on the carousel container for outside-tap detection
  const containerRef = useRef<HTMLDivElement>(null);

  const handleIconTap = useCallback((name: string) => {
    // Toggle: tapping the active icon dismisses it; tapping another switches directly
    setActiveIcon(prev => (prev === name ? null : name));
  }, []);

  // When an icon is active on touch, listen for taps outside the carousel and
  // dismiss the active state (which also resumes the animation).
  // The listener is only attached while something is active — no permanent overhead.
  useEffect(() => {
    if (activeIcon === null) return;

    const handleOutside = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      if (!containerRef.current?.contains(e.target as Node)) {
        setActiveIcon(null);
      }
    };

    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [activeIcon]);

  // .marquee-paused is a CSS class that sets animation-play-state: paused.
  // It freezes the current transform without resetting the position.
  // Only applied on touch (desktop uses CSS :hover inside @media (hover: hover)).
  const trackBase = isHe ? "marquee-track-rtl" : "marquee-track";
  const trackClass = `${trackBase}${activeIcon ? " marquee-paused" : ""} flex items-center gap-x-5 sm:gap-x-8 w-max`;

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
        are never cut off. pt-9 gives headroom for the tooltip + animation.
        marquee-mask applies the responsive edge-fade (72px desktop / 40px mobile).
        containerRef enables outside-tap detection for dismissing active icons.
      */}
      <div
        ref={containerRef}
        className="marquee-mask relative w-full [overflow-x:clip] pt-9 pb-3"
        dir="ltr"
        role="region"
        aria-label={label}
      >
        {/* Track: items rendered twice for seamless translateX(-50%) loop.
            dir="ltr" on the parent ensures flex always lays out L→R regardless
            of page locale, so the -50% translateX trick works correctly.
            RTL uses the reversed keyframe (starts at -50%, ends at 0).
            Mobile gap: gap-x-5 (20px) — slightly tighter than desktop gap-x-8 (32px). */}
        <div className={trackClass} aria-hidden="true">
          {TECHS.map((tech) => (
            <TechIcon
              key={tech.name}
              {...tech}
              isActive={activeIcon === tech.name}
              onTap={handleIconTap}
            />
          ))}
          {TECHS.map((tech) => (
            <TechIcon
              key={`${tech.name}-dup`}
              {...tech}
              isActive={activeIcon === tech.name}
              onTap={handleIconTap}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
