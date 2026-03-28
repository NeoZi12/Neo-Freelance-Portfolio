'use client'

import { Icon } from '@iconify/react'
import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, stagger, viewport } from '@/lib/motion'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const icons = ['gg:profile', 'gravity-ui:target', 'ri:stack-fill'] as const

function withHighlights(text: string, phrases: readonly string[]) {
  const nodes: React.ReactNode[] = []
  let remaining = text
  for (const phrase of phrases) {
    const idx = remaining.indexOf(phrase)
    if (idx === -1) continue
    if (idx > 0) nodes.push(remaining.slice(0, idx))
    nodes.push(
      <span key={phrase} className="text-brand-orange">
        {phrase}
      </span>,
    )
    remaining = remaining.slice(idx + phrase.length)
  }
  if (remaining) nodes.push(remaining)
  return nodes
}

export default function ServicesSection() {
  const { locale, t } = useLanguage()
  const isHe = locale === 'he'

  return (
    <section
      id="services"
      className={cn(
        'bg-gradient-to-b from-about-dark to-about-warm scroll-mt-16 lg:scroll-mt-0',
        'min-h-screen flex flex-col',
        montserrat.className,
      )}
    >
      <div className="hidden lg:block h-[90px] shrink-0" />

      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center pt-10 pb-8 px-6">

        {/* Heading */}
        <motion.h2
          className="text-center font-bold text-4xl leading-none mb-10 lg:mb-16"
          dir={isHe ? 'rtl' : 'ltr'}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <span className="text-white">{t.services.headingRegular} </span>
          <span className="text-brand-orange">{t.services.headingOrange}</span>
        </motion.h2>

        {/* Cards — stagger container */}
        <motion.div
          className="flex flex-col lg:flex-row gap-10 lg:gap-[52px] justify-center items-center lg:items-stretch w-full"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {t.services.items.map((service, i) => (
            /*
             * Wrapper handles the scroll-in animation; inner div keeps
             * CSS hover:scale intact (Framer Motion inline transform
             * would override Tailwind hover:scale on the same element).
             */
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="w-full max-w-[300px] lg:w-[300px]"
            >
              <div className="bg-card-dark rounded-2xl w-full h-full min-h-[380px] flex flex-col items-center pt-8 pb-6 px-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(230,126,34,0.35)]">
                <Icon
                  icon={icons[i]}
                  width={64}
                  height={64}
                  style={{ color: '#E67E22' }}
                  className="drop-shadow-[0_0_18px_rgba(230,126,34,0.45)]"
                />
                <h3 className="font-bold text-[20px] leading-7 text-brand-orange text-center mt-2 [text-shadow:0_0_18px_rgba(230,126,34,0.45)]">
                  {service.title}
                </h3>
                <p
                  className="font-medium text-base leading-5 text-white text-center mt-6 w-full"
                  dir={isHe ? 'rtl' : 'ltr'}
                >
                  {withHighlights(service.description, service.highlights)}
                </p>
                <a
                  href="#contact"
                  className="mt-auto w-[200px] h-10 flex items-center justify-center bg-card-dark border-2 border-brand-orange rounded-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.35),0_10px_24px_rgba(230,126,34,0.4)] font-semibold text-base text-white"
                >
                  {t.services.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
