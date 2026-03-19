import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Freelance Web Developer - Neo Zino",
  description: "Freelance web designer & developer crafting modern, high-quality digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
