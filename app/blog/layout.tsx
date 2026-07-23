import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Blog chrome. Navbar + spacer + content + Footer, mirroring the /free-guide
 * precedent. Navbar/Footer are client components that read locale from the
 * LanguageProvider already mounted in the root layout, so no extra provider is
 * needed here. The Navbar renders its simplified `/blog` branch (logo → home,
 * "Blog" label, language switcher) and skips the single-page observers.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="h-[64px] lg:h-[90px] shrink-0" />
      <main className="min-h-[100dvh] bg-portal-canvas">{children}</main>
      <Footer />
    </>
  );
}
