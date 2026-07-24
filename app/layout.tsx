import type { Metadata, Viewport } from "next";
import { Heebo, Geist } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { montserrat, jakarta, inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const heebo = Heebo({
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heebo",
  // Not preloaded — Heebo is only applied when the user switches to Hebrew.
  // Preloading it for every English visitor wastes a preload slot that should
  // go to the LCP image (the hero portrait).
  preload: false,
});

export const viewport: Viewport = {
  // Warm near-black canvas — matches the portal surface, not the orange brand.
  themeColor: "#0c0a09",
};

const PORTAL_TITLE = "Neo Zino | Tools for Claude Code";
const PORTAL_DESC =
  "Two tools for Claude Code by Neo Zino: ClockedCode sets it up to full power, UsageCut scans and cuts wasted tokens. Pick where your setup is today.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PORTAL_TITLE,
  description: PORTAL_DESC,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: PORTAL_TITLE,
    description: PORTAL_DESC,
    siteName: "Neo Zino",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: PORTAL_TITLE,
    description: PORTAL_DESC,
  },
};

// Minimal Organization schema for the studio hub. The two products are listed
// so search engines can associate both with the studio.
const siteSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#studio`,
  name: "Neo Zino",
  url: SITE_URL,
  description:
    "Neo Zino builds tools for Claude Code: ClockedCode (a setup kit that takes a stock install to full power) and UsageCut (a local scan that cuts wasted tokens).",
  sameAs: ["https://github.com/NeoZi12"],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "SoftwareApplication",
        name: "ClockedCode",
        applicationCategory: "DeveloperApplication",
        description:
          "A one-paste setup kit for Claude Code — a curated stack, MCP servers, custom agents, and a tuned global CLAUDE.md.",
        url: "https://clockedcode.com",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "SoftwareApplication",
        name: "UsageCut",
        applicationCategory: "DeveloperApplication",
        description:
          "A local scanning and optimization tool for Claude Code that finds and cuts wasted tokens — lossless and reversible, code never leaves your machine.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(heebo.variable, montserrat.variable, jakarta.variable, inter.variable, "font-sans", geist.variable)}>
      <body>
        <MotionProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
