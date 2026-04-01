'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, viewport, EASE } from '@/lib/motion'
import { montserrat, jakarta, inter } from '@/lib/fonts'
import userCheck from '@iconify-icons/tabler/user-check'
import world from '@iconify-icons/tabler/world'
import presentation from '@iconify-icons/tabler/presentation'
import search from '@iconify-icons/tabler/search'
import settings2 from '@iconify-icons/tabler/settings-2'
import calendarEvent from '@iconify-icons/tabler/calendar-event'
import bolt from '@iconify-icons/tabler/bolt'
import rocket from '@iconify-icons/tabler/rocket'
import circle from '@iconify-icons/tabler/circle'

// One icon per item — index matches s.left.items / s.right.items order
const LEFT_ICONS = [
  userCheck,   // Turn visitors into clients
  world,       // Build a strong online presence
  presentation,// Present your business clearly
  search,      // SEO-optimized structure
]

const RIGHT_ICONS = [
  settings2,    // Fully customizable to your business needs
  calendarEvent,// Manage bookings and client interactions
  bolt,         // Automate payments and processes
  rocket,       // Fast, scalable, high-performance system
]

// ── Bullet list animations ─────────────────────────────────────────────────────
// Tighter stagger than the global default (90ms vs 130ms) for a crisper read-in.
const bulletStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

// LTR: each bullet slides in from the left
const bulletFadeLeft: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
}

// RTL (Hebrew): each bullet slides in from the right
const bulletFadeRight: Variants = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
}

// ── Card hover state ───────────────────────────────────────────────────────────
type HoveredSide = 'left' | 'right' | null

// Shared transition for all card-level hover animations
const cardTransition = { duration: 0.25, ease: EASE }

export default function ServicesSection() {
  const { locale, t } = useLanguage()
  const isHe = locale === 'he'
  const s = t.services

  // Tracks which card is hovered — null when neither is.
  // Set on each card's onMouseEnter; reset on the grid container's onMouseLeave
  // so moving directly between cards never briefly hits null.
  const [hoveredSide, setHoveredSide] = useState<HoveredSide>(null)

  // Scale up the active card; dim the inactive one. Neutral when nothing is hovered.
  function cardAnimate(side: 'left' | 'right') {
    return {
      scale: hoveredSide === side ? 1.015 : 1,
      opacity: hoveredSide !== null && hoveredSide !== side ? 0.65 : 1,
    }
  }

  // Bullet direction matches reading direction
  const bulletVariant = isHe ? bulletFadeRight : bulletFadeLeft

  return (
    <section
      id="services"
      className="relative min-h-screen bg-[#131313] overflow-hidden flex flex-col scroll-mt-16 lg:scroll-mt-0"
    >
      {/* ── Navbar spacer ── */}
      <div className="hidden lg:block h-[90px] shrink-0" />

      {/* ── Decorative blur blobs ── */}
      <div
        aria-hidden
        className="hidden sm:block pointer-events-none absolute w-[640px] h-[640px] left-[128px] top-[232px] rounded-full bg-[rgba(255,183,125,0.05)] blur-[60px]"
      />
      <div
        aria-hidden
        className="hidden sm:block pointer-events-none absolute w-[480px] h-[480px] right-[128px] bottom-[232px] rounded-full bg-[rgba(253,184,129,0.05)] blur-[50px]"
      />

      {/* ── Content area ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-6 lg:py-8">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">

          {/* ── Section title ── */}
          <motion.h2
            dir={isHe ? "rtl" : "ltr"}
            className={cn(
              "text-[32px] lg:text-[38px] font-bold text-center mb-5 lg:mb-7 leading-tight",
              montserrat.className,
            )}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <span className="text-white">{s.titleWhite} </span>
            <span className="text-[#E67E22]">{s.titleOrange}</span>
          </motion.h2>

          {/*
           * ── Two-column grid ──
           *
           * Each column is a single motion.div card that handles hover interactions
           * (scale, opacity, bottom glow). Content rows stack inside each card via
           * flex-col, preserving all original padding and spacing values.
           *
           * onMouseLeave on the grid container (not the cards) prevents a null-flash
           * when moving the cursor directly from one card to the other.
           *
           * Hover effects are pointer-based — they never trigger on touch screens,
           * so mobile layout is unaffected.
           */}
          <div
            className="w-full grid grid-cols-1 lg:grid-cols-2 relative"
            onMouseLeave={() => setHoveredSide(null)}
          >
            {/* Center divider — desktop only */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px -translate-x-px pointer-events-none z-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(230,126,34,0) 0%, #E67E22 50%, rgba(230,126,34,0) 100%)",
                filter: "drop-shadow(0px 0px 15px rgba(255,140,0,0.3))",
              }}
            />

            {/* ══════════════════ LEFT CARD ══════════════════ */}
            <motion.div
              className="relative z-10 lg:pr-16 flex flex-col"
              onMouseEnter={() => setHoveredSide('left')}
              animate={cardAnimate('left')}
              transition={cardTransition}
            >
              {/* ROW 1: Big service title */}
              <motion.div
                dir={isHe ? "rtl" : "ltr"}
                className="pb-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <span
                  className={cn(
                    "block text-[16px] font-semibold tracking-[5px] text-[#E67E22]/65 mb-2",
                    montserrat.className,
                  )}
                >
                  {s.left.number}
                </span>
                <h3
                  className={cn(
                    "text-[40px] lg:text-[50px] font-extrabold leading-tight",
                    jakarta.className,
                  )}
                >
                  <span className="text-white">{s.left.titleA} </span>
                  <br />
                  <span className="text-[#E67E22]">{s.left.titleB}</span>
                </h3>
              </motion.div>

              {/* ROW 2: Who is it for */}
              <motion.div
                dir={isHe ? "rtl" : "ltr"}
                className="pb-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <p
                  className={cn(
                    "flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[3.5px] mb-2 text-white/40",
                    inter.className,
                  )}
                >
                  <span className="text-[13px] leading-none text-[#E67E22]">✦</span>
                  {s.whoLabel}
                </p>
                <p
                  className={cn(
                    "text-[17px] lg:text-[19px] font-semibold leading-snug text-white/90",
                    isHe && "text-right",
                    jakarta.className,
                  )}
                >
                  {s.left.whoAnswer}
                </p>
              </motion.div>

              {/* ROW 3: Description */}
              <motion.div
                dir={isHe ? "rtl" : "ltr"}
                className="pb-2"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <p className={cn(
                  "text-sm lg:text-[15px] font-medium text-[#B8AFA8] w-full max-w-[448px] leading-relaxed",
                  isHe && "text-right",
                  inter.className,
                )}>
                  {s.left.description}
                </p>
              </motion.div>

              {/* ROW 4: Bullet list — staggered horizontal slide-in on scroll */}
              <motion.ul
                key={`left-${locale}`}
                className="pb-5 flex flex-col"
                variants={bulletStagger}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                {s.left.items.map((item, i) => (
                  <motion.li
                    key={item}
                    variants={bulletVariant}
                    dir={isHe ? "rtl" : "ltr"}
                    className="flex flex-row items-center gap-3 py-4 border-b border-[rgba(86,67,52,0.25)]"
                  >
                    <Icon
                      icon={LEFT_ICONS[i] ?? circle}
                      width={17}
                      height={17}
                      className="shrink-0 text-[#E67E22]"
                    />
                    <span
                      className={cn(
                        "text-[16px] font-medium leading-[26px] text-[#E5E2E1]",
                        isHe && "text-right",
                        jakarta.className,
                      )}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* ROW 5: CTA */}
              <motion.div
                className={cn(isHe && "flex justify-end")}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px" }}
                transition={{
                  delay: 1.2,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href="#contact"
                  className={cn(
                    "inline-flex items-center justify-center min-w-[200px]",
                    "bg-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3 text-sm whitespace-nowrap",
                    "shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200",
                    montserrat.className,
                  )}
                >
                  {s.left.cta}
                </a>
              </motion.div>
            </motion.div>

            {/* ══════════════════ RIGHT CARD ══════════════════ */}
            <motion.div
              className="relative z-10 mt-10 lg:mt-0 lg:pl-16 flex flex-col"
              onMouseEnter={() => setHoveredSide('right')}
              animate={cardAnimate('right')}
              transition={cardTransition}
            >
              {/* ROW 1: Big service title */}
              <motion.div
                dir={isHe ? "rtl" : "ltr"}
                className="pb-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <span
                  className={cn(
                    "block text-[16px] font-semibold tracking-[5px] text-[#E67E22]/65 mb-2",
                    montserrat.className,
                  )}
                >
                  {s.right.number}
                </span>
                <h3
                  className={cn(
                    "text-[40px] lg:text-[50px] font-extrabold leading-tight",
                    jakarta.className,
                  )}
                >
                  <span className="text-white">{s.right.titleA} </span>
                  <br />
                  <span className="text-[#E67E22]">{s.right.titleB}</span>
                </h3>
              </motion.div>

              {/* ROW 2: Who is it for */}
              <motion.div
                dir={isHe ? "rtl" : "ltr"}
                className="pb-3"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <p
                  className={cn(
                    "flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[3.5px] mb-2 text-white/40",
                    inter.className,
                  )}
                >
                  <span className="text-[13px] leading-none text-[#E67E22]">✦</span>
                  {s.whoLabel}
                </p>
                <p
                  className={cn(
                    "text-[17px] lg:text-[19px] font-semibold leading-snug text-white/90",
                    isHe && "text-right",
                    jakarta.className,
                  )}
                >
                  {s.right.whoAnswer}
                </p>
              </motion.div>

              {/* ROW 3: Description */}
              <motion.div
                dir={isHe ? "rtl" : "ltr"}
                className="pb-2"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                <p className={cn(
                  "text-sm lg:text-[15px] font-medium text-[#B8AFA8] w-full max-w-[448px] leading-relaxed",
                  isHe && "text-right",
                  inter.className,
                )}>
                  {s.right.description}
                </p>
              </motion.div>

              {/* ROW 4: Bullet list — staggered horizontal slide-in on scroll */}
              <motion.ul
                key={`right-${locale}`}
                className="pb-5 flex flex-col"
                variants={bulletStagger}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
              >
                {s.right.items.map((item, i) => (
                  <motion.li
                    key={item}
                    variants={bulletVariant}
                    dir={isHe ? "rtl" : "ltr"}
                    className="flex flex-row items-center gap-3 py-4 border-b border-[rgba(86,67,52,0.25)]"
                  >
                    <Icon
                      icon={RIGHT_ICONS[i] ?? circle}
                      width={17}
                      height={17}
                      className="shrink-0 text-[#E67E22]"
                    />
                    <span
                      className={cn(
                        "text-[16px] font-medium leading-[26px] text-[#E5E2E1]",
                        isHe && "text-right",
                        jakarta.className,
                      )}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* ROW 5: CTA */}
              <motion.div
                className={cn(isHe && "flex justify-end")}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px" }}
                transition={{
                  delay: 1.2,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href="#contact"
                  className={cn(
                    "inline-flex items-center justify-center min-w-[200px]",
                    "bg-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3 text-sm whitespace-nowrap",
                    "shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200",
                    montserrat.className,
                  )}
                >
                  {s.right.cta}
                </a>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
