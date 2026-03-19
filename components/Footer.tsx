"use client";

import { Montserrat } from "next/font/google";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const bodyFont = Montserrat({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export default function Footer() {
  return (
    <footer className={cn("w-full bg-[#080604]", bodyFont.className)}>
      {/* Orange gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />

      <div className="relative flex items-center justify-center px-6 sm:px-10 lg:px-[130px] py-8">

        {/* Copyright — centered */}
        <p className="text-xs tracking-wide">
          <span className="text-white/30">© 2026 </span>
          <span className="text-brand-orange/60">Neo Zino</span>
          <span className="text-white/30">. All rights reserved.</span>
        </p>

        {/* Back to top — pinned to the right */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={cn(
            "absolute right-6 sm:right-10 lg:right-[130px]",
            "group flex items-center gap-2 text-white/35 text-xs font-medium tracking-widest uppercase",
            "hover:text-white/70 transition-colors duration-300",
          )}
        >
          <span className="hidden sm:inline">Back to top</span>
          <span
            className={cn(
              "flex items-center justify-center w-7 h-7 rounded-full",
              "border border-white/15",
              "group-hover:border-brand-orange/60 group-hover:shadow-[0_0_10px_rgba(230,126,34,0.3)]",
              "transition-all duration-300",
            )}
          >
            <Icon icon="lucide:arrow-up" width={13} height={13} />
          </span>
        </button>

      </div>
    </footer>
  );
}
