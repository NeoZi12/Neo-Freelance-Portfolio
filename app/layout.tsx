import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
