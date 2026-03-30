'use client'

import { Plus_Jakarta_Sans, Montserrat, Inter } from 'next/font/google'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, stagger, viewport } from '@/lib/motion'

// Highlight phrases painted orange inside description text
const LEFT_HIGHLIGHTS  = ['small businesses', 'professionals', 'online presence'] as const
const RIGHT_HIGHLIGHTS = ['businesses', 'scale', 'automate'] as const

function withHighlights(text: string, phrases: readonly string[]) {
  const nodes: React.ReactNode[] = []
  let remaining = text
  for (const phrase of phrases) {
    const idx = remaining.indexOf(phrase)
    if (idx === -1) continue
    if (idx > 0) nodes.push(remaining.slice(0, idx))
    nodes.push(<span key={phrase} className="text-[#E67E22]">{phrase}</span>)
    remaining = remaining.slice(idx + phrase.length)
  }
  if (remaining) nodes.push(remaining)
  return nodes
}

// One icon per item — index matches s.left.items / s.right.items order
const LEFT_ICONS = [
  'tabler:world',        // Business websites
  'tabler:browser',      // Landing pages
  'tabler:briefcase',    // Portfolio websites
  'tabler:speakerphone', // Marketing sites
]

const RIGHT_ICONS = [
  'tabler:calendar',              // Booking systems
  'tabler:credit-card',           // Payments & automation
  'tabler:chart-bar',             // Client dashboards
  'tabler:adjustments-horizontal',// Fully-customizable systems
]

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '800'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
})

export default function ServicesSection() {
  const { locale, t } = useLanguage()
  const isHe = locale === 'he'
  const s = t.services

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
        className="pointer-events-none absolute w-[640px] h-[640px] left-[128px] top-[232px] rounded-full bg-[rgba(255,183,125,0.05)] blur-[60px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute w-[480px] h-[480px] right-[128px] bottom-[232px] rounded-full bg-[rgba(253,184,129,0.05)] blur-[50px]"
      />

      {/* ── Content area ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">

          {/* ── Section title ── */}
          <motion.h2
            className={cn(
              'text-[32px] lg:text-[36px] font-bold text-center mb-10 lg:mb-12 leading-tight',
              montserrat.className,
            )}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <span className="text-[#E67E22]">{s.titleOrange} </span>
            <span className="text-white">{s.titleWhite}</span>
          </motion.h2>

          {/*
           * ── Two-column grid ──
           *
           * On desktop (lg+): a 2-column CSS grid where items interleave
           * left/right so each semantic row (eyebrow, heading, desc, list, cta)
           * shares the same row height — guaranteeing the lists start at
           * exactly the same vertical position regardless of text length.
           *
           * On mobile (grid-cols-1): `order-*` groups all left-column items
           * first (order 1–5), then all right-column items (order 6–10),
           * with a top margin on the first right item for visual separation.
           *)
          */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 relative">

            {/* Center divider — desktop only */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px -translate-x-px pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(230,126,34,0) 0%, #E67E22 50%, rgba(230,126,34,0) 100%)',
                filter: 'drop-shadow(0px 0px 15px rgba(255,140,0,0.3))',
              }}
            />

            {/* ── ROW 1: Eyebrows ── */}
            <motion.p
              dir={isHe ? 'rtl' : 'ltr'}
              className={cn(
                'order-1 lg:order-none',
                'text-[11px] font-semibold uppercase tracking-[3.6px] text-white',
                'lg:pr-16 pb-3',
                inter.className,
              )}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {s.left.eyebrow}
            </motion.p>

            <motion.p
              dir={isHe ? 'rtl' : 'ltr'}
              className={cn(
                'order-6 lg:order-none',
                'text-[11px] font-semibold uppercase tracking-[3.6px] text-[#E67E22]',
                'mt-12 lg:mt-0 lg:pl-16 pb-3',
                inter.className,
              )}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {s.right.eyebrow}
            </motion.p>

            {/* ── ROW 2: Headings ── */}
            <motion.h3
              dir={isHe ? 'rtl' : 'ltr'}
              className={cn(
                'order-2 lg:order-none',
                'text-[38px] lg:text-[48px] font-extrabold leading-[1.05] text-[#E67E22]',
                'lg:pr-16 pb-4',
                jakarta.className,
              )}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {s.left.heading}
            </motion.h3>

            <motion.h3
              dir={isHe ? 'rtl' : 'ltr'}
              className={cn(
                'order-7 lg:order-none',
                'text-[38px] lg:text-[48px] font-extrabold leading-[1.05] text-[#E5E2E1]',
                'lg:pl-16 pb-4',
                jakarta.className,
              )}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {s.right.heading}
            </motion.h3>

            {/* ── ROW 3: Descriptions ── */}
            <motion.p
              dir={isHe ? 'rtl' : 'ltr'}
              className={cn(
                'order-3 lg:order-none',
                'text-sm lg:text-[15px] font-medium text-[#B8AFA8] max-w-[448px] leading-relaxed',
                'lg:pr-16 pb-6',
                inter.className,
              )}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {withHighlights(s.left.description, LEFT_HIGHLIGHTS)}
            </motion.p>

            <motion.p
              dir={isHe ? 'rtl' : 'ltr'}
              className={cn(
                'order-8 lg:order-none',
                'text-sm lg:text-[15px] font-medium text-[#B8AFA8] max-w-[448px] leading-relaxed',
                'lg:pl-16 pb-6',
                inter.className,
              )}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {withHighlights(s.right.description, RIGHT_HIGHLIGHTS)}
            </motion.p>

            {/* ── ROW 4: Lists ── */}
            <motion.ul
              className="order-4 lg:order-none lg:pr-16 pb-7 flex flex-col"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {s.left.items.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  dir={isHe ? 'rtl' : 'ltr'}
                  className="flex flex-row items-center py-3 border-b border-[rgba(86,67,52,0.25)]"
                >
                  <Icon
                    icon={LEFT_ICONS[i] ?? 'tabler:circle'}
                    width={17}
                    height={17}
                    className="shrink-0 text-[#E67E22]"
                  />
                  <span className={cn('ml-3 text-[16px] font-medium leading-[26px] text-[#E5E2E1]', jakarta.className)}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.ul
              className="order-9 lg:order-none lg:pl-16 pb-7 flex flex-col"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {s.right.items.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  dir={isHe ? 'rtl' : 'ltr'}
                  className="flex flex-row items-center py-3 border-b border-[rgba(86,67,52,0.25)]"
                >
                  <Icon
                    icon={RIGHT_ICONS[i] ?? 'tabler:circle'}
                    width={17}
                    height={17}
                    className="shrink-0 text-[#9CA3AF]"
                  />
                  <span className={cn('ml-3 text-[16px] font-medium leading-[26px] text-[#E5E2E1]', jakarta.className)}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* ── ROW 5: CTAs ── */}
            <motion.div
              className="order-5 lg:order-none lg:pr-16"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {/* Outline/dark — matches hero "Get Your Website" button */}
              <a
                href="#contact"
                className={cn(
                  'inline-flex items-center justify-center min-w-[200px]',
                  'border-2 border-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3 text-sm whitespace-nowrap',
                  'shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200',
                  montserrat.className,
                )}
              >
                {s.left.cta}
              </a>
            </motion.div>

            <motion.div
              className="order-10 lg:order-none lg:pl-16"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {/* Solid orange — matches hero "View My Work" button */}
              <a
                href="#contact"
                className={cn(
                  'inline-flex items-center justify-center min-w-[200px]',
                  'bg-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3 text-sm whitespace-nowrap',
                  'shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200',
                  montserrat.className,
                )}
              >
                {s.right.cta}
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
