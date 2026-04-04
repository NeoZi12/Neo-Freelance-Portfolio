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

// ── Avatar helper ─────────────────────────────────────────────────────────────

function AvatarCircle({ circle, popOut }: { circle: number; popOut: number }) {
  const portraitH = Math.round(circle * (1024 / 768));
  const prefersReducedMotion = useReducedMotion();

  // Hover scale only on true pointer devices — never on touch screens
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  return (
    <motion.div
      className="relative"
      style={{ width: circle, height: circle + popOut }}
      // Desktop-only scale on hover: smooth, refined, not dramatic
      whileHover={canHover && !prefersReducedMotion ? { scale: 1.025 } : undefined}
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
            sizes="(min-width: 1024px) 340px, 220px"
            className="object-contain object-top"
          />
        </div>

        {/* Layer B: hair pop-out */}
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
            quality={30}
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
        "relative min-h-[100dvh] w-full scroll-mt-0",
        montserrat.className,
      )}
    >
      {/* Hero background — not LCP, eager load without preload to keep the preload slot for the portrait */}
      <Image
        src="/images/orange-mountains.jpg"
        alt=""
        fill
        loading="eager"
        quality={80}
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/68 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-[100dvh]">
        {/* Spacer matching the fixed navbar height */}
        <div className="h-[64px] lg:h-[90px] shrink-0" />

        {/* Content area */}
        <div className="flex-1 flex items-start lg:items-center px-6 sm:px-10 lg:px-[60px] xl:px-[130px] py-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_480px] gap-4 lg:gap-14 xl:gap-20 items-center w-full">
            {/* ── Left column: Text ── */}
            <div
              className={cn("flex flex-col gap-5", isHe && "text-right")}
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
                className="text-4xl lg:text-[50px] font-semibold text-white leading-tight"
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
                    אני בונה <span className="text-[#E67E22]">דפי נחיתה</span>{" "}
                    שמביאים לך לקוחות, ו
                    <span className="text-[#E67E22]">מערכות מותאמות אישית</span>{" "}
                    שעוזרות לך לנהל ו
                    <span className="text-[#E67E22]">לתפעל את העסק שלך</span>{" "}
                    אונליין.
                  </>
                ) : (
                  <>
                    I build{" "}
                    <span className="text-[#E67E22]">landing pages</span> that
                    bring you clients, and{" "}
                    <span className="text-[#E67E22]">custom systems</span> that
                    help you manage and{" "}
                    <span className="text-[#E67E22]">run your business</span>{" "}
                    online.
                  </>
                )}
              </motion.p>

              {/* CTAs — last */}
              <motion.div
                className="flex flex-row flex-wrap gap-5 mt-2"
                initial={heroInitial}
                animate={heroAnimate}
                transition={heroTransition(0.80)}
              >
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center bg-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3.5 text-sm whitespace-nowrap shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200"
                >
                  {t.hero.cta1}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center border-2 border-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3.5 text-sm whitespace-nowrap shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200"
                >
                  {t.hero.cta2}
                </a>
              </motion.div>
            </div>

            {/* ── Right column: Avatar — concurrent with headline ── */}
            <motion.div
              className="flex items-center justify-center"
              initial={heroInitial}
              animate={heroAnimate}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            >
              {/* Mobile (< lg): 220px circle */}
              <div className="lg:hidden">
                <AvatarCircle circle={220} popOut={44} />
              </div>
              {/* Desktop (lg+): 340px */}
              <div className="hidden lg:block">
                <AvatarCircle circle={340} popOut={70} />
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
