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
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-inter',
})

export const logoFont = Island_Moments({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
