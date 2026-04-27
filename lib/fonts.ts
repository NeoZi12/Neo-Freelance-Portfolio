import { Montserrat, Plus_Jakarta_Sans, Inter, Island_Moments } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
  // Not preloaded — only used in below-the-fold sections (Services /
  // Why-and-Testimonials). Preloading would compete with the LCP image
  // for the early bandwidth budget. CSS triggers the load when the
  // sections come into view; system-font fallback shows in the meantime.
  preload: false,
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-inter',
  // Not preloaded — only used inside ServicesSection. Same reasoning as
  // Plus Jakarta above.
  preload: false,
})

export const logoFont = Island_Moments({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  // Not preloaded — logo font is decorative and non-critical for LCP.
  // The system font fallback shows instantly; Island Moments swaps in silently.
  preload: false,
})
