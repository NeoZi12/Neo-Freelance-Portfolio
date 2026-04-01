import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { montserrat, jakarta, inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const heebo = Heebo({
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "Freelance Web Developer - Neo Zino",
  description: "Freelance web designer & developer crafting modern, high-quality digital experiences.",
  openGraph: {
    title: "Freelance Web Developer - Neo Zino",
    description: "Freelance web designer & developer crafting modern, high-quality digital experiences.",
    url: "https://neo-freelance-portfolio.vercel.app",
    siteName: "Neo Zino",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(heebo.variable, montserrat.variable, jakarta.variable, inter.variable)}>
      <body>
        <MotionProvider>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
