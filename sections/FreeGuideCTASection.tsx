"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts";
import { fadeUp, viewport } from "@/lib/motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FreeGuideCTASection() {
  const router = useRouter();
  const { locale } = useLanguage();
  const isHe = locale === "he";

  function handleClick() {
    const params = new URLSearchParams(window.location.search);
    router.push(`/free-guide?${params.toString()}`);
  }

  return (
    <section
      className={cn(
        "bg-gradient-to-b from-[#1f1107] to-[#080604]",
        "min-h-[50vh] flex items-center justify-center",
        "px-6 sm:px-10 py-20 lg:py-0",
        montserrat.className,
      )}
    >
      <motion.div
        className="flex flex-col items-center text-center gap-6 max-w-[560px] mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        dir={isHe ? "rtl" : "ltr"}
      >
        <h2 className="text-white text-[34px] sm:text-[35px] font-semibold leading-tight">
          {isHe
            ? "רוצה שהאתר שלך יביא לך יותר לקוחות?"
            : "Want More Clients From Your Website?"}
        </h2>

        <div className="w-10 h-[2px] bg-brand-orange rounded-full" />

        <p className="text-white/60 text-base sm:text-lg leading-relaxed">
          {isHe
            ? "קבל את המדריך החינמי שלי לשיפור האתר שלך ומשיכת לקוחות נוספים"
            : "Get my free guide to improve your website and attract more clients"}
        </p>

        <button
          onClick={handleClick}
          className={cn(
            "mt-2 bg-brand-orange text-white font-semibold text-sm",
            "rounded-[18px] px-8 py-3.5 cursor-pointer",
            "shadow-[0px_10px_24px_rgba(230,126,34,0.4)]",
            "hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200",
          )}
        >
          {isHe ? "קבל את המדריך החינמי" : "Get the Free Guide"}
        </button>
      </motion.div>
    </section>
  );
}
