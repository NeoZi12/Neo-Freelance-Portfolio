'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, stagger, viewport } from '@/lib/motion'
import { montserrat, jakarta } from '@/lib/fonts'
import world from '@iconify-icons/tabler/world'
import palette from '@iconify-icons/tabler/palette'
import trendingUp from '@iconify-icons/tabler/trending-up'
import adjustmentsHorizontal from '@iconify-icons/tabler/adjustments-horizontal'

const whyIcons = [world, palette, trendingUp, adjustmentsHorizontal]

export default function WhyAndTestimonialsSection() {
  const { locale, t } = useLanguage()
  const isHe = locale === 'he'
  const w = t.whyUs
  const tm = t.testimonials

  return (
    <section
      id="why-us"
      className="bg-[#131313] flex flex-col lg:min-h-screen scroll-mt-16 lg:scroll-mt-0"
    >
      {/* Navbar spacer — desktop only */}
      <div className="hidden lg:block h-[90px] shrink-0" />

      {/* ── TOP HALF: Why Work With Me ── */}
      <div
        dir={isHe ? 'rtl' : 'ltr'}
        className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-[60px] xl:px-[130px] py-10 lg:py-0"
      >
        {/* Title */}
        <motion.h2
          className={cn('text-[32px] lg:text-[38px] font-bold text-center mb-4 lg:mb-5', montserrat.className)}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className="text-[#E67E22]">{w.titleOrange} </span>
          <span className="text-white">{w.titleWhite}</span>
        </motion.h2>

        {/* 2×2 bullet grid — full available width, equal-height cells */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {w.bullets.map((bullet, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-center gap-4 px-6 py-5 rounded-xl border border-white/10 bg-white/5 [box-shadow:inset_0_0_0_1px_rgba(230,126,34,0.15)]"
            >
              {/* Icon in a soft orange-tinted badge */}
              <div className="w-10 h-10 rounded-lg bg-[#E67E22]/10 flex items-center justify-center shrink-0">
                <Icon
                  icon={whyIcons[i]}
                  width={20}
                  height={20}
                  className="text-[#E67E22]"
                />
              </div>
              <span className={cn('text-sm lg:text-[15px] text-white/90 font-medium leading-snug', jakarta.className)}>
                {bullet}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Horizontal divider — desktop only */}
      <div
        aria-hidden
        className="hidden lg:block h-px mx-[60px] xl:mx-[130px] shrink-0"
        style={{
          background: 'linear-gradient(90deg, rgba(230,126,34,0) 0%, rgba(230,126,34,0.35) 50%, rgba(230,126,34,0) 100%)',
        }}
      />

      {/* ── BOTTOM HALF: Testimonials ── */}
      <div
        dir={isHe ? 'rtl' : 'ltr'}
        className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-[60px] xl:px-[130px] py-10 lg:py-0"
      >
        {/* Title */}
        <motion.h2
          className={cn('text-[32px] lg:text-[38px] font-bold text-center mb-4 lg:mb-5', montserrat.className)}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className="text-[#E67E22]">{tm.titleOrange} </span>
          <span className="text-white">{tm.titleWhite}</span>
        </motion.h2>

        {/* Quote cards — centered single card */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {tm.items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative bg-white/[0.03] border border-white/10 [box-shadow:inset_0_0_0_1px_rgba(230,126,34,0.08)] rounded-2xl p-5 lg:p-6 overflow-hidden flex flex-col justify-between"
            >
              {/* Opening quote mark — top left (top right in RTL) */}
              <span
                aria-hidden
                className={cn(
                  'absolute top-3 text-[56px] font-bold text-[#E67E22] opacity-[0.2] leading-none select-none pointer-events-none',
                  isHe ? 'right-4' : 'left-4',
                  jakarta.className,
                )}
              >
                &ldquo;
              </span>

              {/* Closing quote mark — bottom right (bottom left in RTL) */}
              <span
                aria-hidden
                className={cn(
                  'absolute bottom-3 text-[56px] font-bold text-[#E67E22] opacity-[0.2] leading-none select-none pointer-events-none',
                  isHe ? 'left-4' : 'right-4',
                  jakarta.className,
                )}
              >
                &rdquo;
              </span>

              {/* Quote text */}
              <p className="text-[13px] lg:text-[14px] italic text-white/80 leading-relaxed mt-6 mb-4 pr-4">
                {item.quote}
              </p>

              {/* Attribution — pinned to bottom */}
              <p className={cn('text-[12px]', jakarta.className)}>
                <span className="text-white/35">— </span>
                <span className="text-[#E67E22] font-semibold">{item.author}</span>
                <span className="text-white/35"> · {item.role}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
