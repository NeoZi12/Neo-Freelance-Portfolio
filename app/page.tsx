import dynamic from "next/dynamic";
import HeroSection from "@/sections/HeroSection";

const ServicesSection = dynamic(() => import("@/sections/ServicesSection"));
const AboutSection = dynamic(() => import("@/sections/AboutSection"));
const PortfolioSection = dynamic(() => import("@/sections/PortfolioSection"));
const WhyAndTestimonialsSection = dynamic(() => import("@/sections/WhyAndTestimonialsSection"));
const HowItWorksSection = dynamic(() => import("@/sections/HowItWorksSection"));
const ContactSection = dynamic(() => import("@/sections/ContactSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <WhyAndTestimonialsSection />
      <HowItWorksSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
