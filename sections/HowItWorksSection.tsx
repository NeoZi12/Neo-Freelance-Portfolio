'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, fadeLeft, fadeRight, viewport } from '@/lib/motion'
import { montserrat } from '@/lib/fonts'
import chevronDown from '@iconify-icons/mdi/chevron-down'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to have all the content ready before we start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not at all. If you already have content, that's great — but if not, I'll guide you through exactly what's needed and can help you create or structure it so everything fits your website perfectly.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the whole process take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the scope of the project. Smaller projects like landing pages or portfolio websites are usually completed relatively quickly, while larger or more complex websites take more time. The timeline also depends on how quickly content and feedback are provided.",
      },
    },
    {
      "@type": "Question",
      name: "Can I request changes during the project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, of course. The process includes revisions, and we'll work together to refine everything until you're happy with the result.",
      },
    },
    {
      "@type": "Question",
      name: "What if I don't have a design or know what I want?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That's completely fine. I'll help you define the direction, style, and structure based on your business and goals, so you don't need any design or technical background.",
      },
    },
    {
      "@type": "Question",
      name: "How do I handle domain and hosting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you'd like a custom domain, you can purchase one — but it's completely optional. For hosting, I typically recommend reliable platforms like Vercel. If you're unsure about any part of the process, I'll guide you step by step to make everything simple and stress-free.",
      },
    },
    {
      "@type": "Question",
      name: "Will my website work on mobile devices?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, it will work on all screen sizes — including mobile, tablet, and desktop — and will be fully optimized for a smooth experience.",
      },
    },
  ],
};

export default function HowItWorksSection() {
  const { locale, t } = useLanguage()
  const isHe = locale === 'he'
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  /*
   * Direction-aware variants: the steps column is visually on the left in LTR
   * and on the right in RTL (due to flex-row-reverse). FAQ is the opposite.
   */
  const stepsVariant = isHe ? fadeRight : fadeLeft
  const faqVariant   = isHe ? fadeLeft  : fadeRight

  return (
    <section
      id="how-it-works"
      className={cn(
        'bg-gradient-to-b from-hiw-dark to-hiw-warm scroll-mt-16 lg:scroll-mt-0',
        'min-h-screen flex flex-col',
        montserrat.className,
      )}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Navbar spacer (desktop only) */}
      <div className="hidden lg:block h-[90px] shrink-0" />

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 sm:px-10 lg:px-[130px] py-16 lg:py-14">

        {/* Section heading */}
        <motion.div
          dir={isHe ? 'rtl' : 'ltr'}
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <h2 className="font-bold text-4xl leading-none">
            <span className="text-white">{t.howItWorks.sectionTitle1} </span>
            <span className="text-brand-orange">{t.howItWorks.sectionTitle2}</span>
          </h2>
          <p className="mt-3 text-sm text-white/50 font-medium">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Two columns */}
        <div
          className={cn(
            'flex flex-col lg:flex-row gap-14 lg:gap-16 items-start w-full',
            isHe && 'lg:flex-row-reverse',
          )}
        >
          {/* LEFT — Steps: slides in from its visual side */}
          <motion.div
            className="w-full lg:w-1/2"
            dir={isHe ? 'rtl' : 'ltr'}
            variants={stepsVariant}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {/* Column header */}
            <div className="mb-8">
              <p className="text-white/80 text-xs uppercase tracking-widest font-semibold">
                {t.howItWorks.stepsTitle}
              </p>
              <div className="mt-2 w-8 h-[2px] bg-brand-orange rounded-full" />
            </div>

            {/* Steps timeline */}
            <div className={cn('relative', isHe ? 'pr-10' : 'pl-10')}>
              {/* Vertical line */}
              <div
                className={cn(
                  'absolute top-1 bottom-1 w-[2px] bg-brand-orange/25 rounded-full',
                  isHe ? 'right-[15px]' : 'left-[15px]',
                )}
              />

              {t.howItWorks.steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex gap-5 mb-9 last:mb-0"
                >
                  {/* Number circle */}
                  <div
                    className={cn(
                      'absolute top-0.5 flex items-center justify-center',
                      'w-8 h-8 rounded-full bg-[#1c1411] border border-brand-orange z-10',
                      'text-brand-orange text-xs font-bold shrink-0',
                      isHe ? '-right-10' : '-left-10',
                    )}
                  >
                    {step.number}
                  </div>

                  {/* Text */}
                  <div className={cn('pt-1', isHe && 'text-right')}>
                    <h3 className="font-bold text-white text-base leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-white/65 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — FAQ accordion: slides in from its visual side */}
          <motion.div
            className="w-full lg:w-1/2"
            dir={isHe ? 'rtl' : 'ltr'}
            variants={faqVariant}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {/* Column header */}
            <div className="mb-8">
              <p className="text-white/80 text-xs uppercase tracking-widest font-semibold">
                {t.howItWorks.faqTitle}
              </p>
              <div className="mt-2 w-8 h-[2px] bg-brand-orange rounded-full" />
            </div>

            {/* FAQ items */}
            <div className="flex flex-col divide-y divide-white/10">
              {t.howItWorks.faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i}>
                    {/* Question row */}
                    <button
                      className={cn(
                        'w-full flex items-center justify-between gap-4 py-4 cursor-pointer',
                        isHe ? 'text-right' : 'text-left',
                      )}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-label={faq.q}
                    >
                      <span className="font-semibold text-white text-sm lg:text-base leading-snug">
                        {faq.q}
                      </span>
                      <Icon
                        icon={chevronDown}
                        width={20}
                        height={20}
                        className={cn(
                          'text-brand-orange shrink-0 transition-transform duration-300',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>

                    {/* Answer */}
                    {isOpen && (
                      <div
                        className={cn(
                          'pb-5 text-white/65 text-sm leading-relaxed',
                          isHe
                            ? 'border-r-2 border-brand-orange pr-3 text-right'
                            : 'border-l-2 border-brand-orange pl-3',
                        )}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
