import type { Metadata, Viewport } from "next";
import { Heebo, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { montserrat, jakarta, inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";

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
  themeColor: "#E67E22",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://neo-freelance-portfolio.vercel.app"),
  title: "Neo Zino | Freelance Web Developer",
  description:
    "Freelance web developer based in Israel. I build landing pages and custom full-stack systems that convert visitors into clients and automate your business online.",
  alternates: {
    canonical: "https://neo-freelance-portfolio.vercel.app",
  },
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
    title: "Neo Zino | Freelance Web Developer",
    description:
      "Freelance web developer based in Israel. I build landing pages and custom full-stack systems that convert visitors into clients and automate your business online.",
    url: "https://neo-freelance-portfolio.vercel.app",
    siteName: "Neo Zino",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/neo2dmetadata.png",
        width: 520,
        height: 480,
        alt: "Neo Zino – Freelance Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neo Zino | Freelance Web Developer",
    description:
      "Freelance web developer based in Israel. I build landing pages and custom full-stack systems that convert visitors into clients and automate your business online.",
    images: ["/images/neo2dmetadata.png"],
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://neo-freelance-portfolio.vercel.app/#person",
      name: "Neo Zino",
      url: "https://neo-freelance-portfolio.vercel.app",
      jobTitle: "Freelance Web Developer",
      description:
        "Freelance web developer based in Israel. I build landing pages and custom full-stack systems that convert visitors into clients and automate your business online.",
      email: "neozi2014@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IL",
      },
      sameAs: [
        "https://www.linkedin.com/in/neozino",
        "https://github.com/NeoZi12",
      ],
      image: "https://neo-freelance-portfolio.vercel.app/images/neo2dmetadata.png",
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": "https://neo-freelance-portfolio.vercel.app/#service",
      name: "Neo Zino – Freelance Web Development",
      url: "https://neo-freelance-portfolio.vercel.app",
      areaServed: "Worldwide",
      founder: { "@id": "https://neo-freelance-portfolio.vercel.app/#person" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Landing Pages & Portfolio Websites",
              description:
                "A clean, professional website built to convert visitors into clients and be optimized for search engines from the start. For small businesses and professionals.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full-Stack Custom Websites",
              description:
                "Custom-built system that automates your operations and helps you manage clients at scale. For businesses that want to scale online.",
            },
          },
        ],
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
            <Navbar />
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
