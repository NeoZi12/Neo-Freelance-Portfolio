import dynamic from "next/dynamic";
import HeroSection from "@/sections/HeroSection";
import SectionScroller from "@/components/SectionScroller";

const ServicesSection = dynamic(() => import("@/sections/ServicesSection"));
const AboutSection = dynamic(() => import("@/sections/AboutSection"));
const PortfolioSection = dynamic(() => import("@/sections/PortfolioSection"));
const WhyAndTestimonialsSection = dynamic(() => import("@/sections/WhyAndTestimonialsSection"));
const HowItWorksSection = dynamic(() => import("@/sections/HowItWorksSection"));
const ContactSection = dynamic(() => import("@/sections/ContactSection"));
const FreeGuideCTASection = dynamic(() => import("@/sections/FreeGuideCTASection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main>
      <SectionScroller />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <WhyAndTestimonialsSection />
      <HowItWorksSection />
      <ContactSection />
      <FreeGuideCTASection />
      <Footer />
    </main>
  );
}
