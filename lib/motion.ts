import type { Variants } from "framer-motion";

// ── Shared easing & duration ───────────────────────────────────────────────

/** easeOutExpo — snappy start, buttery settle */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Base transition duration (most elements) */
export const DUR = 0.65;

// ── Viewport config ────────────────────────────────────────────────────────

/** Trigger animation when element is 80px into the viewport, only once */
export const viewport = { once: true, margin: "-80px 0px" } as const;

// ── Base variants ──────────────────────────────────────────────────────────

/** Default: fade up — used for most content elements */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: DUR, ease: EASE } },
};

/** Fade from the left — left-column content in split layouts */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show:   { opacity: 1, x: 0,   transition: { duration: DUR, ease: EASE } },
};

/** Fade from the right — right-column content in split layouts */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0,  transition: { duration: DUR, ease: EASE } },
};

// ── Stagger containers ─────────────────────────────────────────────────────

/**
 * Standard stagger — for sections with 3–6 child elements.
 * The container itself has no visual state; it only controls timing.
 */
export const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

/**
 * Fast stagger — for many small repeated items (skill badges, social links).
 */
export const staggerFast: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};
