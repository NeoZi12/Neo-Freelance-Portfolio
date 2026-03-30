"use client";

import { useState, useEffect, useRef } from "react";
import { Island_Moments, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n";

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

type NavHref = "/" | "/about" | "/services" | "/how-it-works" | "/portfolio" | "/contact";

// ── Language Switcher ──────────────────────────────────────────────────────────

function LangSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative flex justify-end items-center h-full">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-1 text-white text-sm font-bold tracking-wider uppercase px-2 py-1 select-none cursor-pointer",
          navFont.className,
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {locale.toUpperCase()}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className={cn("transition-transform duration-200", open && "rotate-180")}
        >
          <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full right-0 mt-1 bg-black border border-white/10 rounded-lg overflow-hidden min-w-[160px] z-50"
        >
          {(["en", "he"] as Locale[]).map((lang) => (
            <li key={lang} role="option" aria-selected={locale === lang}>
              <button
                onClick={() => handleSelect(lang)}
                className={cn(
                  "w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors duration-150 cursor-pointer",
                  navFont.className,
                )}
              >
                <span className={cn("text-[#E67E22]", locale !== lang && "invisible")}>✓</span>
                <span>{lang.toUpperCase()}</span>
                <span className="text-white/40 font-normal normal-case tracking-normal">
                  — {lang === "en" ? "English" : "עברית"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<NavHref>("/");

  const navLinksBase = [
    { label: t.nav.home, href: "/" as NavHref, id: "home" },
    { label: t.nav.services, href: "/services" as NavHref, id: "services" },
    { label: t.nav.about, href: "/about" as NavHref, id: "about" },
    { label: t.nav.howItWorks, href: "/how-it-works" as NavHref, id: "how-it-works" },
    { label: t.nav.portfolio, href: "/portfolio" as NavHref, id: "portfolio" },
    { label: t.nav.contact, href: "/contact" as NavHref, id: "contact" },
  ];
  const isHe = locale === "he";
  const navLinks = isHe ? [...navLinksBase].reverse() : navLinksBase;
  const mobileNavLinks = navLinksBase;

  function withLang(path: string) {
    return path + window.location.search;
  }

  function scrollToSection(id: string, href: NavHref) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", withLang(href));
      setActiveLink(href);
    }
  }

  useEffect(() => {
    // On initial load, scroll to section matching the current path
    const path = window.location.pathname;
    if (path !== "/") {
      const id = path.replace("/", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto" });
        setActiveLink(path as NavHref);
      }
    }
  }, []);

  useEffect(() => {
    const sectionIds: string[] = ["home", "services", "about", "how-it-works", "portfolio", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const href = id === "home" ? "/" : `/${id}`;
            setActiveLink(href as NavHref);
            window.history.replaceState(null, "", withLang(href));
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
        className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center h-[90px] lg:px-8 xl:px-[70px]"
        aria-label="Main navigation"
      >
        {/* Left column — Logo */}
        <button
          onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveLink("/"); window.history.replaceState(null, "", withLang("/")); }}
          className={cn(
            "inline-flex items-center text-white text-[42px] xl:text-[60px] leading-none font-normal select-none m-0 p-0 justify-self-start whitespace-nowrap cursor-pointer",
            logoFont.className,
          )}
        >
          Neo Zino
        </button>

        {/* Center column — Nav links */}
        <ul
          className={cn(
            "flex flex-row items-stretch h-full lg:gap-1 xl:gap-[20px]",
            navFont.className,
          )}
          role="list"
        >
          {navLinks.map(({ label, href, id }) => (
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
              <button
                onClick={() => scrollToSection(id, href)}
                className="h-full flex items-center lg:px-3 xl:px-8 text-white text-sm xl:text-lg font-semibold whitespace-nowrap cursor-pointer"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right column — Language switcher */}
        <div className="justify-self-end">
          <LangSwitcher />
        </div>
      </nav>

      {/* ── Mobile nav (below lg) ── */}
      <div className="lg:hidden bg-black">
        <nav
          className="flex items-center justify-between h-[64px] px-6"
          aria-label="Main navigation"
        >
          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveLink("/"); window.history.replaceState(null, "", withLang("/")); }}
            className={cn(
              "text-white text-[2.2rem] leading-none select-none cursor-pointer",
              logoFont.className,
            )}
          >
            Neo Zino
          </button>

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
                  <line x1="1" y1="1" x2="21" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="21" y1="1" x2="1" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="0" y1="2" x2="22" y2="2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="9" x2="22" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round" />
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
              isHe && "items-end",
              navFont.className,
            )}
            role="list"
          >
            {mobileNavLinks.map(({ label, href, id }) => (
              <li key={href}>
                <button
                  className={cn(
                    "relative inline-block text-white text-base font-bold py-2 cursor-pointer",
                    "after:content-[''] after:absolute after:-bottom-0 after:h-[3px] after:bg-[#E67E22]",
                    isHe ? "after:right-0" : "after:left-0",
                    "after:transition-all after:duration-300 after:ease-in-out",
                    activeLink === href ? "after:w-full" : "after:w-0",
                  )}
                  onClick={() => {
                    scrollToSection(id, href);
                    setMenuOpen(false);
                  }}
                >
                  {label}
                </button>
              </li>
            ))}

            {/* Language switcher divider + toggle */}
            <li className="pt-1 w-full">
              <div className={cn(
                "border-t border-white/10 pt-3 flex items-center gap-4",
                isHe && "justify-end",
              )}>
                {(["en", "he"] as Locale[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLocale(lang);
                      setMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider transition-colors duration-150",
                      locale === lang ? "text-[#E67E22]" : "text-white/50 hover:text-white",
                    )}
                  >
                    {lang.toUpperCase()}
                    <span className="font-normal normal-case tracking-normal text-xs opacity-70">
                      — {lang === "en" ? "English" : "עברית"}
                    </span>
                  </button>
                ))}
              </div>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
