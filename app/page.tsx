import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ServicesSection from "@/sections/ServicesSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import PortfolioSection from "@/sections/PortfolioSection";
import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <HowItWorksSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
