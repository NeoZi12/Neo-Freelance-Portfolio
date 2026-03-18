"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Island_Moments, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

// Exact Figma font: Island Moments, weight 400
const logoFont = Island_Moments({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const navFont = Montserrat({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
] as const;

type NavHref = (typeof navLinks)[number]["href"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<NavHref>("#home");

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${id}` as NavHref);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-[64px] lg:h-[90px] bg-black">
      {/* ── Desktop nav (lg and above) ── */}
      <nav
        className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-[90px] px-[70px]"
        aria-label="Main navigation"
      >
        {/* Left column — Logo */}
        <Link
          href="/"
          className={cn(
            "inline-flex items-center text-white text-[42px] xl:text-[60px] leading-none font-normal select-none m-0 p-0 justify-self-start whitespace-nowrap",
            logoFont.className,
          )}
        >
          Neo Zino
        </Link>

        {/* Center column — Nav links */}
        <ul
          className={cn(
            "flex flex-row items-stretch h-full gap-[20px]",
            navFont.className,
          )}
          role="list"
        >
          {navLinks.map(({ label, href }) => (
            <li
              key={href}
              className={cn(
                "relative h-full",
                "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0",
                "after:h-[5px] after:bg-[#E67E22]",
                "after:transition-transform after:duration-300 after:origin-center",
                activeLink === href
                  ? "after:scale-x-100"
                  : "after:scale-x-0 hover:after:scale-x-100",
              )}
            >
              <Link
                href={href}
                onClick={() => setActiveLink(href)}
                className="h-full flex items-center px-8 text-white text-lg font-semibold whitespace-nowrap"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right column — empty spacer to keep links centered */}
        <div />
      </nav>

      {/* ── Mobile nav (below lg) ── */}
      <div className="lg:hidden bg-black">
        <nav
          className="flex items-center justify-between h-[64px] px-6"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className={cn(
              "text-white text-[2.2rem] leading-none select-none",
              logoFont.className,
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
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line
                    x1="1"
                    y1="1"
                    x2="21"
                    y2="17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="21"
                    y1="1"
                    x2="1"
                    y2="17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <line
                    x1="0"
                    y1="2"
                    x2="22"
                    y2="2"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="0"
                    y1="9"
                    x2="22"
                    y2="9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="0"
                    y1="16"
                    x2="22"
                    y2="16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
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
              navFont.className,
            )}
            role="list"
          >
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "relative inline-block text-white text-base font-bold py-2",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-0 after:h-[3px] after:bg-[#E67E22]",
                    "after:transition-all after:duration-300 after:ease-in-out",
                    activeLink === href ? "after:w-full" : "after:w-0",
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
