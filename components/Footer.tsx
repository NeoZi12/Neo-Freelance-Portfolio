"use client";

import { Montserrat } from "next/font/google";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const bodyFont = Montserrat({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export default function Footer() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";

  return (
    <footer className={cn("w-full bg-[#080604]", bodyFont.className)}>
      {/* Orange gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />

      <div className="relative flex items-center justify-center px-6 sm:px-10 lg:px-[130px] py-8">
        {/* Copyright — centered */}
        <p className="text-xs tracking-wide">
          <span className="text-white">{t.footer.copyrightPrefix}</span>
          <span className="text-brand-orange">Neo Zino</span>
          <span className="text-white">{t.footer.copyrightSuffix}</span>
        </p>

        {/* Back to top — pinned right (EN) or left (HE) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={cn(
            "absolute",
            isHe
              ? "left-6 sm:left-10 lg:left-[130px]"
              : "right-6 sm:right-10 lg:right-[130px]",
            "group flex items-center gap-2 text-white text-xs font-medium tracking-widest uppercase cursor-pointer",
            "hover:text-brand-orange transition-colors duration-300",
          )}
        >
          {isHe && (
            <span
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full",
                "border border-white",
                "group-hover:border-brand-orange group-hover:shadow-[0_0_10px_rgba(230,126,34,0.3)]",
                "transition-all duration-300",
              )}
            >
              <Icon icon="lucide:arrow-up" width={13} height={13} />
            </span>
          )}
          <span className="hidden sm:inline">{t.footer.backToTop}</span>
          {!isHe && (
            <span
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full",
                "border border-white",
                "group-hover:border-brand-orange group-hover:shadow-[0_0_10px_rgba(230,126,34,0.3)]",
                "transition-all duration-300",
              )}
            >
              <Icon icon="lucide:arrow-up" width={13} height={13} />
            </span>
          )}
        </button>
      </div>
    </footer>
  );
}
