'use client'

import { Icon } from '@iconify/react'
import { Montserrat } from 'next/font/google'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

interface Service {
  icon: string
  iconSize: number
  title: string
  description: ReactNode
}

const services: Service[] = [
  {
    icon: 'gg:profile',
    iconSize: 64,
    title: 'Portfolio Page',
    description: (
      <>
        Modern portfolio websites{' '}
        <span className="text-brand-orange">for freelancers and individuals</span>,
        designed to{' '}
        <span className="text-brand-orange">present your work</span>{' '}
        clearly and help you stand out online.
      </>
    ),
  },
  {
    icon: 'gravity-ui:target',
    iconSize: 64,
    title: 'Landing Page',
    description: (
      <>
        Clean landing pages{' '}
        <span className="text-brand-orange">for businesses</span>, designed to
        strengthen your digital footprint and{' '}
        <span className="text-brand-orange">present your business</span>{' '}
        clearly to potential customers.
      </>
    ),
  },
  {
    icon: 'ri:stack-fill',
    iconSize: 64,
    title: 'Full-Stack Website',
    description: (
      <>
        Custom websites{' '}
        <span className="text-brand-orange">for businesses</span>, built with
        the features,{' '}
        <span className="text-brand-orange">data</span>, and functionality
        needed to create a{' '}
        <span className="text-brand-orange">fully functioning</span> online
        experience.
      </>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className={cn(
        'bg-gradient-to-b from-about-dark to-about-warm',
        'min-h-screen lg:h-screen flex flex-col',
        montserrat.className,
      )}
    >
      {/* Spacer matching fixed navbar height — pushes content below navbar on desktop */}
      <div className="hidden lg:block h-[90px] shrink-0" />

      {/* flex-1 fills remaining height; centers content within that space */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 pb-8 px-6">

      {/* Heading */}
      <h2 className="text-center font-bold text-4xl leading-none mb-10">
        <span className="text-white">My </span>
        <span className="text-brand-orange">Services</span>
      </h2>

      {/* Cards */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-[52px] justify-center items-center lg:items-stretch w-full">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-card-dark rounded-2xl w-full max-w-[300px] lg:w-[300px] min-h-[380px] flex flex-col items-center pt-8 pb-6 px-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(230,126,34,0.35)]"
          >
            <Icon
              icon={service.icon}
              width={service.iconSize}
              height={service.iconSize}
              style={{ color: '#E67E22' }}
              className="drop-shadow-[0_0_18px_rgba(230,126,34,0.45)]"
            />
            <h3 className="font-bold text-[20px] leading-7 text-brand-orange text-center mt-2 [text-shadow:0_0_18px_rgba(230,126,34,0.45)]">
              {service.title}
            </h3>
            <p className="font-medium text-base leading-5 text-white text-center mt-6 w-full">
              {service.description}
            </p>
            <a
              href="#contact"
              className="mt-auto w-[200px] h-10 flex items-center justify-center bg-card-dark border-2 border-brand-orange rounded-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.35),0_10px_24px_rgba(230,126,34,0.4)] font-semibold text-base text-white"
            >
              Contact Me
            </a>
          </div>
        ))}
      </div>

      </div>
    </section>
  )
}
