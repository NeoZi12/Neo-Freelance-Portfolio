"use client";

// Swaps between phrases without shifting layout.
// An invisible copy of the longest phrase reserves the exact inline space;
// the visible phrase is absolutely positioned on top of it, so surrounding
// text never jumps or reflows when the phrase changes.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

interface RotatingPhraseProps {
  phrases: readonly string[];
  /** Controlled externally so multiple instances stay in sync */
  index: number;
  className?: string;
}

// Matches Tailwind's `md` breakpoint — below this we treat as mobile.
const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

export function RotatingPhrase({ phrases, index, className }: RotatingPhraseProps) {
  const longest = [...phrases].reduce((a, b) => (a.length >= b.length ? a : b));
  const isMobile = useIsMobile();

  // Desktop: gentle fade + slight vertical slide.
  // Mobile: near-pure fade with minimal movement to avoid clunkiness on small screens.
  const variants = isMobile
    ? {
        initial:    { opacity: 0, y: 2 },
        animate:    { opacity: 1, y: 0 },
        exit:       { opacity: 0, y: -2 },
        transition: { duration: 0.25, ease: EASE },
      }
    : {
        initial:    { opacity: 0, y: 10 },
        animate:    { opacity: 1, y: 0 },
        exit:       { opacity: 0, y: -8 },
        transition: { duration: 0.32, ease: EASE },
      };

  return (
    <span className={cn("relative inline-block", className)}>
      {/* Layout anchor — always the longest phrase, never visible */}
      <span className="invisible select-none" aria-hidden="true">
        {longest}
      </span>

      {/* Animated phrase — absolute so it never affects surrounding layout */}
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={index}
          className="absolute inset-0"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={variants.transition}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
