"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE, DUR } from "@/lib/motion";
import { RotatingPhrase } from "@/components/RotatingPhrase";
import { montserrat } from "@/lib/fonts";

// Paired phrase sets — both lines rotate together in sync.
// Keep each phrase close in length to the current text to avoid line-wrap shifts.
const EN_LINE1 = [
  "bring clients.",
  "convert visitors.",
  "generate leads.",
  "drive results.",
] as const;
const EN_LINE2 = [
  "manage them.",
  "run automatically.",
  "scale with you.",
  "save you time.",
] as const;
const HE_LINE1 = [
  "מביאים לקוחות.",
  "ממירים גולשים.",
  "מגדילים פניות.",
  "מייצרים ערך.",
] as const;
const HE_LINE2 = [
  "מנהלות אותם.",
  "עובדות אוטומטית.",
  "גדלות איתך.",
  "חוסכות לך זמן.",
] as const;

// ── Viewport helper ───────────────────────────────────────────────────────────

// Tracks whether the viewport is below Tailwind's `md` breakpoint (768px).
// Used to scale down the Ken Burns motion on small screens.
function useIsSmallViewport() {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsSmall(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isSmall;
}

// ── Avatar helper ─────────────────────────────────────────────────────────────

function AvatarCircle({ circle, popOut }: { circle: number; popOut: number }) {
  const portraitH = Math.round(circle * (1024 / 768));
  const prefersReducedMotion = useReducedMotion();

  // Hover scale only on true pointer devices — never on touch screens
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  return (
    <motion.div
      className="relative"
      style={{ width: circle, height: circle + popOut }}
      // Desktop-only scale on hover: smooth, refined, not dramatic
      whileHover={
        canHover && !prefersReducedMotion ? { scale: 1.025 } : undefined
      }
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow — static box-shadow, only opacity pulses (GPU-composited, zero repaint) */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 rounded-full"
        style={{
          height: circle,
          boxShadow:
            "0 0 64px 22px rgba(230,126,34,0.32), 0 0 140px 64px rgba(230,126,34,0.13)",
        }}
        animate={prefersReducedMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
        }}
      />

      {/* Dark circle fill */}
      <div
        className="absolute left-0 right-0 bottom-0 rounded-full bg-[#252421]/70"
        style={{ height: circle }}
      />

      <div
        className="absolute top-0 left-0"
        style={{ width: circle, height: portraitH }}
      >
        {/* Layer A: portrait inside the circle */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            clipPath: `circle(${circle / 2}px at 50% ${popOut + circle / 2}px)`,
          }}
        >
          <Image
            src="/images/neo2d.png"
            alt="Neo Zino – Freelance Web Developer"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 340px, 220px"
            className="object-contain object-top"
          />
        </div>

        {/* Layer B: hair pop-out — intentionally no `quality` override so the
            browser reuses the already-preloaded Layer A resource (same URL). */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            clipPath: `path('M 0 0 L ${circle} 0 L ${circle} ${popOut + circle / 2 + 6} A ${circle / 2} ${circle / 2} 0 0 0 0 ${popOut + circle / 2 + 6} Z')`,
          }}
        >
          <Image
            src="/images/neo2d.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 340px, 220px"
            className="object-contain object-top"
            aria-hidden
          />
        </div>
      </div>

      {/* Orange border ring */}
      <div
        className="absolute left-0 right-0 bottom-0 rounded-full border-4 border-[#E67E22] pointer-events-none z-[5]"
        style={{ height: circle }}
      />
    </motion.div>
  );
}

// ── Shared hero transition factory ────────────────────────────────────────────

function heroTransition(delay: number) {
  return { duration: DUR, ease: EASE, delay };
}

const heroInitial = { opacity: 0, y: 16 } as const;
const heroAnimate = { opacity: 1, y: 0 } as const;

// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";
  const prefersReducedMotion = useReducedMotion();
  const isSmallViewport = useIsSmallViewport();

  // Ken Burns target state — second extreme of the ping-pong.
  // Mobile halves scale and pan amplitude to reduce GPU load and keep
  // critical image content (mountain peak) in frame.
  // Pixels (not %) so framer-motion never reads offsetWidth/Height per frame —
  // percentage transforms force a layout-measure pass on each animation tick.
  const kenBurnsRest = { scale: 1, x: 0, y: 0 } as const;
  const kenBurnsTarget = isSmallViewport
    ? { scale: 1.03, x: 4, y: -3 }
    : { scale: 1.06, x: 24, y: -8 };

  // Shared index drives both lines so they always rotate together
  const [phraseIndex, setPhraseIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setPhraseIndex((i) => (i + 1) % EN_LINE1.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className={cn(
        // overflow-hidden clips the 1.06x scaled bg so it can't bleed into the next section
        "relative min-h-[100dvh] w-full scroll-mt-0 overflow-hidden",
        montserrat.className,
      )}
    >
      {/* Hero background — Ken Burns layer.
          Wrapping next/image in a motion.div keeps srcset/AVIF optimization
          while letting us animate the entire composited layer via transform
          only (no layout/paint work per frame). */}
      <motion.div
        className="absolute inset-0"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        initial={kenBurnsRest}
        animate={prefersReducedMotion ? kenBurnsRest : kenBurnsTarget}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 20,
                ease: [0.45, 0, 0.55, 1],
                repeat: Infinity,
                repeatType: "reverse",
              }
        }
        aria-hidden
      >
        {/* No `priority` and no `loading="eager"` — both make Next.js auto-emit a
            preload <link> for this 582KB background, which competes with the
            avatar (the actual LCP) for early bandwidth. The image is in the
            initial viewport so the browser still loads it eagerly via
            IntersectionObserver; we just stop it from jumping the preload queue. */}
        <Image
          src="/images/bg-hero.webp"
          alt=""
          fill
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
      </motion.div>
      {/* Gradient overlay — responsive: mobile uses a vertical gradient so
          orange accent text stays readable across the full width; desktop
          uses a left-weighted radial so the mountain/portrait side stays
          visible. Sits between image and content (z-10 wrapper below). */}

      {/* Mobile overlay (< 768px) — full-width vertical gradient.
          Top/navbar zone strong, text zone held at ~75%, fades under the
          portrait, with a bottom anchor. */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.90) 55%, rgba(0,0,0,0.68) 75%, rgba(0,0,0,0.78) 100%)",
        }}
        aria-hidden
      />

      {/* Desktop overlay (≥ 768px) — left-weighted radial + bottom anchor. */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: [
            // Bottom anchor — painted on top of the radial, only dark near the bottom
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 40%)",
            // Left-side radial — dominant impression is dark hero with orange glow peeking through, not an orange scene
            "radial-gradient(ellipse 100% 120% at 0% 0%, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.90) 25%, rgba(0,0,0,0.82) 50%, rgba(0,0,0,0.62) 75%, rgba(0,0,0,0.42) 100%)",
          ].join(", "),
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        {/* Spacer matching the fixed navbar height */}
        <div className="h-[64px] lg:h-[90px] shrink-0" />

        {/* Content area */}
        <div className="flex-1 flex items-start lg:items-center px-6 sm:px-10 lg:px-[60px] xl:px-[130px] py-4 [@media(max-height:740px)]:py-2">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_480px] gap-4 lg:gap-14 xl:gap-20 items-center w-full">
            {/* ── Left column: Text ── */}
            <div
              className={cn("flex flex-col gap-5 [@media(max-height:740px)]:gap-3", isHe && "text-right")}
              dir={isHe ? "rtl" : "ltr"}
            >
              {/* Greeting — first to appear */}
              <motion.p
                className="text-2xl lg:text-[28px] font-semibold text-white leading-snug"
                initial={heroInitial}
                animate={heroAnimate}
                transition={heroTransition(0.2)}
              >
                {t.hero.greeting}{" "}
                <span className="text-[#E67E22]">{t.hero.name}</span>
                {t.hero.greetingRole}
              </motion.p>

              {/* Headline — second */}
              <motion.h1
                className="text-4xl lg:text-[50px] [@media(max-height:740px)]:lg:text-[40px] font-semibold text-white leading-tight"
                initial={heroInitial}
                animate={heroAnimate}
                transition={heroTransition(0.42)}
              >
                {isHe ? (
                  <>
                    {"אתרים ש"}
                    <RotatingPhrase
                      phrases={HE_LINE1}
                      index={phraseIndex}
                      className="text-[#E67E22]"
                    />
                    <br />
                    {"מערכות ש"}
                    <RotatingPhrase
                      phrases={HE_LINE2}
                      index={phraseIndex}
                      className="text-[#E67E22]"
                    />
                  </>
                ) : (
                  <>
                    {"Websites that "}
                    <RotatingPhrase
                      phrases={EN_LINE1}
                      index={phraseIndex}
                      className="text-[#E67E22]"
                    />
                    <br />
                    {"Systems that "}
                    <RotatingPhrase
                      phrases={EN_LINE2}
                      index={phraseIndex}
                      className="text-[#E67E22]"
                    />
                  </>
                )}
              </motion.h1>

              {/* Description — third */}
              <motion.p
                className="text-sm lg:text-[15px] font-medium text-white/90 max-w-[420px] leading-relaxed"
                initial={heroInitial}
                animate={heroAnimate}
                transition={heroTransition(0.62)}
              >
                {isHe ? (
                  <>
                    אני בונה{" "}
                    <span className="text-[#E67E22]">דפי נחיתה</span>
                    {", "}
                    <span className="text-[#E67E22]">אתרי פורטפוליו</span>
                    {" ו"}
                    <span className="text-[#E67E22]">אתרי פול-סטאק מותאמים אישית</span>
                    {" לעסקים ואנשי מקצוע."}
                  </>
                ) : (
                  <>
                    {"I build high-converting "}
                    <span className="text-[#E67E22]">landing pages</span>
                    {", "}
                    <span className="text-[#E67E22]">portfolio websites</span>
                    {" and custom "}
                    <span className="text-[#E67E22]">full-stack websites</span>
                    {" for businesses and professionals."}
                  </>
                )}
              </motion.p>

              {/* CTAs — last */}
              <motion.div
                className="flex flex-row flex-wrap gap-5 mt-2"
                initial={heroInitial}
                animate={heroAnimate}
                transition={heroTransition(0.8)}
              >
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3.5 text-sm whitespace-nowrap shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200"
                >
                  {t.hero.cta2}
                </a>
              </motion.div>
            </div>

            {/* ── Right column: Avatar — concurrent with headline ──
                Custom easing here (not EASE) is intentional: the avatar is the
                LCP element. With the default easing, opacity 0 → 1 takes the
                full 800ms and Lighthouse waits for the final paint, inflating
                LCP by ~1s. This curve ramps opacity to ~95% in the first 80ms
                so the element registers as "rendered" almost immediately;
                the remaining 5% settles over the rest of the duration so the
                fade still feels intentional, not snapped. */}
            <motion.div
              className="flex items-center justify-center"
              initial={heroInitial}
              animate={heroAnimate}
              transition={{ duration: 0.8, ease: [0.05, 0.95, 0.1, 1], delay: 0.3 }}
            >
              {/* Mobile (< lg): 220px circle */}
              <div className="lg:hidden">
                <AvatarCircle circle={220} popOut={44} />
              </div>
              {/* Desktop (lg+) at tall heights: 340px */}
              <div className="hidden lg:block [@media(min-width:1024px)_and_(max-height:740px)]:hidden">
                <AvatarCircle circle={340} popOut={70} />
              </div>
              {/* Desktop (lg+) at short landscape heights — shrunk so 1024x600 fits */}
              <div className="hidden [@media(min-width:1024px)_and_(max-height:740px)]:block">
                <AvatarCircle circle={260} popOut={50} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — rendered after content div so it always paints on top */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 inset-x-0 hidden sm:flex flex-col items-center gap-2.5 z-20 pointer-events-none [@media(max-height:700px)]:hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR, ease: EASE, delay: 0.9 }}
      >
        <p className="text-white/60 text-[11px] font-medium tracking-[0.18em] uppercase select-none">
          {t.hero.scrollCta}
        </p>
        <motion.a
          href="#services"
          className="pointer-events-auto w-11 h-11 rounded-full border-2 border-[#E67E22] flex items-center justify-center text-[#E67E22] hover:bg-[#E67E22]/10 transition-colors duration-200"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to services"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="4" x2="12" y2="18" />
            <polyline points="6 12 12 19 18 12" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
