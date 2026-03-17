"use client";

import { useState } from "react";
import Link from "next/link";
import { Island_Moments, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";

// Exact Figma font: Island Moments, weight 400
const logoFont = Island_Moments({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Figma font: Product Sans (proprietary, not on Google Fonts)
// Closest available substitute: Nunito — same geometric rounded structure
const navFont = Nunito({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

type NavHref = (typeof navLinks)[number]["href"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<NavHref>("#home");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#1a1a1a] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">

      {/* ── Desktop nav (lg and above) ── */}
      {/*
        No items-center on nav → flex default is align-items:stretch
        → both the logo div and the ul fill the full h-[70px]
        → items-center inside each child vertically centers the content
        → active underline is absolutely positioned so it never shifts text
      */}
      <nav
        className="hidden lg:flex flex-row justify-between h-[70px] px-[70px]"
        aria-label="Main navigation"
      >
        {/* Logo frame: stretches to 70px, items-center centers the text */}
        <div className="flex items-center gap-[10px]">
          <Link
            href="/"
            className={cn(
              "text-white text-[75px] leading-[40px] font-normal select-none",
              logoFont.className
            )}
          >
            Neo Zino
          </Link>
        </div>

        {/* Nav links: stretches to 70px, each li also stretches and centers its text */}
        <ul
          className={cn("flex flex-row gap-[40px]", navFont.className)}
          role="list"
        >
          {navLinks.map(({ label, href }) => (
            <li
              key={href}
              // relative so the absolute underline anchors to this item
              // flex items-center centers the text within the full 70px height
              className="relative flex items-center justify-center px-[10px]"
            >
              <Link
                href={href}
                onClick={() => setActiveLink(href)}
                className="text-white text-[24px] font-bold leading-[40px] whitespace-nowrap"
              >
                {label}
              </Link>

              {/* Active underline: absolutely positioned, never affects text centering */}
              {activeLink === href && (
                <span className="absolute bottom-0 inset-x-0 h-[5px] bg-[#E67E22]" />
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Mobile nav (below lg) ── */}
      <div className="lg:hidden">
        <nav
          className="flex items-center justify-between h-[64px] px-6"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className={cn(
              "text-white text-[2.2rem] leading-none select-none",
              logoFont.className
            )}
          >
            Neo Zino
          </Link>

          <button
            className="text-white p-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
              {menuOpen ? (
                <>
                  <line x1="1" y1="1" x2="21" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="21" y1="1" x2="1" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="0" y1="2"  x2="22" y2="2"  stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="9"  x2="22" y2="9"  stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="16" x2="22" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </nav>

        {menuOpen && (
          <ul
            id="mobile-menu"
            className={cn(
              "flex flex-col px-6 py-4 gap-3 border-t border-white/10",
              navFont.className
            )}
            role="list"
          >
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-white text-base font-bold block py-2",
                    activeLink === href && "border-b-2 border-[#E67E22] inline-block"
                  )}
                  onClick={() => {
                    setActiveLink(href);
                    setMenuOpen(false);
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

    </header>
  );
}
