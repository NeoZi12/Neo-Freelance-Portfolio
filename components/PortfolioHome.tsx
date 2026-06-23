import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HeroSection";
import SectionScroller from "@/components/SectionScroller";

// The original freelance homepage, preserved so neozino.dev/?lang=he still
// serves the Hebrew portfolio after the dev-tools portal took over `/`.
// Below-the-fold sections stay dynamically imported (matches the pre-portal
// homepage); the language toggle and Hebrew text come from LanguageContext
// reading ?lang from the URL.
const ServicesSection = dynamic(() => import("@/sections/ServicesSection"));
const AboutSection = dynamic(() => import("@/sections/AboutSection"));
const PortfolioSection = dynamic(() => import("@/sections/PortfolioSection"));
const WhyAndTestimonialsSection = dynamic(
  () => import("@/sections/WhyAndTestimonialsSection"),
);
const ContactSection = dynamic(() => import("@/sections/ContactSection"));
const FreeGuideCTASection = dynamic(
  () => import("@/sections/FreeGuideCTASection"),
);
const Footer = dynamic(() => import("@/components/Footer"));

export default function PortfolioHome() {
  return (
    <>
      <Navbar />
      <main>
        <SectionScroller />
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioSection />
        <WhyAndTestimonialsSection />
        <ContactSection />
        <FreeGuideCTASection />
        <Footer />
      </main>
    </>
  );
}
