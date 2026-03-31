'use client'

import { Plus_Jakarta_Sans, Montserrat, Inter } from 'next/font/google'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, stagger, viewport } from '@/lib/motion'

// One icon per item — index matches s.left.items / s.right.items order
const LEFT_ICONS = [
  'tabler:user-check',   // Turn visitors into clients
  'tabler:world',        // Build a strong online presence
  'tabler:presentation', // Present your business clearly
  'tabler:search',       // SEO-optimized structure
]

const RIGHT_ICONS = [
  'tabler:settings-2',    // Fully customizable to your business needs
  'tabler:calendar-event',// Manage bookings and client interactions
  'tabler:bolt',          // Automate payments and processes
  'tabler:rocket',        // Fast, scalable, high-performance system
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-6 lg:py-8">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">
          {/* ── Section title ── */}
          <motion.h2
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
                  "linear-gradient(180deg, rgba(230,126,34,0) 0%, #E67E22 50%, rgba(230,126,34,0) 100%)",
                filter: "drop-shadow(0px 0px 15px rgba(255,140,0,0.3))",
              }}
            />

            {/* ── ROW 1: Big service titles ── */}
            <motion.div
              dir={isHe ? "rtl" : "ltr"}
              className="order-1 lg:order-none lg:pr-16 pb-3"
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

            <motion.div
              dir={isHe ? "rtl" : "ltr"}
              className="order-6 lg:order-none mt-10 lg:mt-0 lg:pl-16 pb-3"
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
                <span className="text-white">{s.right.titleA} </span> <br />
                <span className="text-[#E67E22]">{s.right.titleB}</span>
              </h3>
            </motion.div>

            {/* ── ROW 2: Who is it for ── */}
            <motion.div
              dir={isHe ? "rtl" : "ltr"}
              className="order-2 lg:order-none lg:pr-16 pb-3"
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
                <span className="text-[13px] leading-none text-[#E67E22]">
                  ✦
                </span>
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

            <motion.div
              dir={isHe ? "rtl" : "ltr"}
              className="order-7 lg:order-none lg:pl-16 pb-3"
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
                <span className="text-[13px] leading-none text-[#E67E22]">
                  ✦
                </span>
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

            {/* ── ROW 3: Descriptions ── */}
            <motion.div
              dir={isHe ? "rtl" : "ltr"}
              className="order-3 lg:order-none lg:pr-16 pb-2"
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

            <motion.div
              dir={isHe ? "rtl" : "ltr"}
              className="order-8 lg:order-none lg:pl-16 pb-2"
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

            {/* ── ROW 4: Lists ── */}
            <motion.ul
              key={`left-${locale}`}
              className="order-4 lg:order-none lg:pr-16 pb-5 flex flex-col"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {s.left.items.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  dir={isHe ? "rtl" : "ltr"}
                  className="flex flex-row items-center gap-3 py-4 border-b border-[rgba(86,67,52,0.25)]"
                >
                  <Icon
                    icon={LEFT_ICONS[i] ?? "tabler:circle"}
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

            <motion.ul
              key={`right-${locale}`}
              className="order-9 lg:order-none lg:pl-16 pb-5 flex flex-col"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
            >
              {s.right.items.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  dir={isHe ? "rtl" : "ltr"}
                  className="flex flex-row items-center gap-3 py-4 border-b border-[rgba(86,67,52,0.25)]"
                >
                  <Icon
                    icon={RIGHT_ICONS[i] ?? "tabler:circle"}
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

            {/* ── ROW 5: CTAs ── */}
            <motion.div
              className={cn(
                "order-5 lg:order-none lg:pr-16",
                isHe && "flex justify-end",
              )}
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

            <motion.div
              className={cn(
                "order-10 lg:order-none lg:pl-16",
                isHe && "flex justify-end",
              )}
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
          </div>
        </div>
      </div>
    </section>
  );
}
