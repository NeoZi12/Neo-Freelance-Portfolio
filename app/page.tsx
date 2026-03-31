import HeroSection from "@/sections/HeroSection";
import ServicesSection from "@/sections/ServicesSection";
import PortfolioSection from "@/sections/PortfolioSection";
import WhyAndTestimonialsSection from "@/sections/WhyAndTestimonialsSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";

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
