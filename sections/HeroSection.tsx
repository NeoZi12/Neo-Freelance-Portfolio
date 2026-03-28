"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE, DUR } from "@/lib/motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ── Avatar helper ─────────────────────────────────────────────────────────────

function AvatarCircle({ circle, popOut }: { circle: number; popOut: number }) {
  const portraitH = Math.round(circle * (1024 / 768));

  return (
    <div className="relative" style={{ width: circle, height: circle + popOut }}>
      {/* Glow — radiates from the circle area */}
      <div
        className="absolute left-0 right-0 bottom-0 rounded-full"
        style={{
          height: circle,
          boxShadow:
            "0 0 60px 20px rgba(230,126,34,0.30), 0 0 130px 60px rgba(230,126,34,0.12)",
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
            className="object-contain object-top"
            priority
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
    </div>
  );
}

// ── Shared hero transition factory ────────────────────────────────────────────

function heroTransition(delay: number) {
  return { duration: DUR, ease: EASE, delay };
}

const heroInitial = { opacity: 0, y: 24 } as const;
const heroAnimate = { opacity: 1, y: 0 } as const;

// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";

  return (
    <section
      id="home"
      className={cn(
        "relative min-h-[100dvh] lg:h-[100dvh] w-full lg:overflow-hidden scroll-mt-16 lg:scroll-mt-0",
        "bg-[url('/images/orange-mountains.jpg')] bg-cover bg-center bg-no-repeat",
        montserrat.className,
      )}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/68 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
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
                transition={heroTransition(0.15)}
              >
                {t.hero.greeting}{" "}
                <span className="text-[#E67E22]">{t.hero.name}</span>
              </motion.p>

              {/* Headline — second */}
              <motion.h1
                className="text-4xl lg:text-[50px] font-semibold text-white leading-tight"
                initial={heroInitial}
                animate={heroAnimate}
                transition={heroTransition(0.35)}
              >
                {t.hero.headline1}{" "}
                <span className="text-[#E67E22]">
                  {t.hero.headline2}
                  <br />
                  {t.hero.headline3}
                </span>
              </motion.h1>

              {/* Description — third */}
              <motion.p
                className="text-sm lg:text-[15px] font-medium text-white/90 max-w-[420px] leading-relaxed"
                initial={heroInitial}
                animate={heroAnimate}
                transition={heroTransition(0.55)}
              >
                {isHe ? (
                  <>
                    אני מעצב ובונה{" "}
                    <span className="text-[#E67E22]">אתרים</span>{" "}
                    נקיים ומודרניים שעוזרים לעסקים{" "}
                    <span className="text-[#E67E22]">להפוך מבקרים ללקוחות</span>
                    .
                  </>
                ) : (
                  <>
                    I design and build clean, modern{" "}
                    <span className="text-[#E67E22]">websites</span>{" "}
                    that help businesses{" "}
                    <span className="text-[#E67E22]">turn visitors into clients</span>
                    .
                  </>
                )}
              </motion.p>

              {/* CTAs — last */}
              <motion.div
                className="flex flex-row flex-wrap gap-5 mt-2"
                initial={heroInitial}
                animate={heroAnimate}
                transition={heroTransition(0.72)}
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
              {/* Mobile (< lg): 280px circle */}
              <div className="lg:hidden">
                <AvatarCircle circle={280} popOut={58} />
              </div>
              {/* Desktop (lg+): 340px */}
              <div className="hidden lg:block">
                <AvatarCircle circle={340} popOut={70} />
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
