"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE, DUR } from "@/lib/motion";
import Footer from "@/components/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────

type ModalTranslations = {
  title: string;
  subtitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  cta: string;
  privacy: string;
  loading: string;
  successPre: string;
  successPromo: string;
  successMid: string;
  successSpam: string;
  successPost: string;
  errorGeneral: string;
  errorEmail: string;
  errorName: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ── Client-side validation ────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientValidate(
  email: string,
  name: string,
  t: Pick<ModalTranslations, "errorEmail" | "errorName">,
): string | null {
  if (!EMAIL_REGEX.test(email.trim())) return t.errorEmail;
  const trimmedName = name.trim();
  if (trimmedName.length > 0 && trimmedName.length < 2) return t.errorName;
  return null;
}

// ── GuideModal ────────────────────────────────────────────────────────────────

function GuideModal({
  t,
  isHe,
  onClose,
}: {
  t: ModalTranslations;
  isHe: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const isLoading = status === "loading";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Submit: validate client-side, then call our backend, which calls MailerLite
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const validationError = clientValidate(email, name, t);
    if (validationError) {
      setStatus("error");
      setErrorMsg(validationError);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      // Map server-side error codes to user-facing messages
      const data = await res.json().catch(() => ({})) as { error?: string; field?: string };

      if (data.error === "invalid_input" && data.field === "email") {
        setErrorMsg(t.errorEmail);
      } else if (data.error === "invalid_input" && data.field === "name") {
        setErrorMsg(t.errorName);
      } else {
        setErrorMsg(t.errorGeneral);
      }

      setStatus("error");
    } catch {
      // Network-level failure
      setErrorMsg(t.errorGeneral);
      setStatus("error");
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "relative w-full max-w-[480px] bg-[#181614]",
          "border border-white/[0.08] rounded-2xl overflow-hidden",
          montserrat.className,
        )}
        dir={isHe ? "rtl" : "ltr"}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E67E22]/30 to-transparent" />

        {/* Background glow */}
        <div
          className={cn(
            "absolute -top-24 w-56 h-56 bg-[#E67E22]/10 blur-[80px] rounded-full pointer-events-none",
            isHe ? "-left-24" : "-right-24",
          )}
        />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className={cn(
              "absolute top-4 text-white/40 hover:text-white/80 transition-colors cursor-pointer",
              isHe ? "left-4" : "right-4",
            )}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Orange divider */}
          <div className="w-8 h-[2px] bg-[#E67E22] mb-6" />

          {/* ── Success state ─────────────────────────────────────────────── */}
          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-6 gap-5">
              {/* Checkmark icon */}
              <div className="w-14 h-14 rounded-full bg-[#E67E22]/15 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <path
                    d="M5 14l6.5 6.5L23 8"
                    stroke="#E67E22"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-white text-base font-medium leading-relaxed max-w-[320px]">
                {t.successPre}
                <span className="text-[#E67E22]">{t.successPromo}</span>
                {t.successMid}
                <span className="text-[#E67E22]">{t.successSpam}</span>
                {t.successPost}
              </p>
            </div>
          ) : (
            /* ── Form state (idle / loading / error) ─────────────────────── */
            <>
              <h2 className={cn("text-2xl font-bold text-white", t.subtitle ? "mb-2" : "mb-8")}>{t.title}</h2>
              {t.subtitle && (
                <p className="text-white/50 text-sm leading-relaxed mb-8">{t.subtitle}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative group">
                  <label
                    htmlFor="guide-name"
                    className="block text-[10px] uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#E67E22] transition-colors duration-200 mb-2"
                  >
                    {isHe ? "שם" : "Name"}
                  </label>
                  <input
                    id="guide-name"
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    className={cn(
                      "w-full bg-transparent border-0 border-b border-white/20 py-4 px-2",
                      "text-white placeholder:text-white/25 text-sm",
                      "focus:outline-none focus:border-[#E67E22] transition-colors duration-200",
                      "disabled:opacity-50",
                    )}
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <label
                    htmlFor="guide-email"
                    className="block text-[10px] uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#E67E22] transition-colors duration-200 mb-2"
                  >
                    {isHe ? "אימייל" : "Email"}
                  </label>
                  <input
                    id="guide-email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className={cn(
                      "w-full bg-transparent border-0 border-b border-white/20 py-4 px-2",
                      "text-white placeholder:text-white/25 text-sm",
                      "focus:outline-none focus:border-[#E67E22] transition-colors duration-200",
                      "disabled:opacity-50",
                    )}
                  />
                </div>

                {/* Inline error message */}
                {status === "error" && errorMsg && (
                  <p role="alert" className="text-red-400 text-xs leading-relaxed -mt-2">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full bg-[#E67E22] text-white font-semibold rounded-[18px]",
                      "px-8 py-4 text-sm",
                      "shadow-[0px_10px_24px_rgba(230,126,34,0.4)]",
                      "hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200",
                      "flex items-center justify-center gap-2",
                      isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
                    )}
                  >
                    {isLoading ? (
                      <>
                        {/* Spinner */}
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        {t.loading}
                      </>
                    ) : (
                      <>
                        {t.cta}
                        <span className={cn(isHe && "rotate-180")} aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-white/30 uppercase tracking-widest mt-5">
                    {t.privacy}
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── FreeGuidePage ─────────────────────────────────────────────────────────────

export default function FreeGuidePage() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";
  const [modalOpen, setModalOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const fg = t.freeGuide;

  function fu(delay: number) {
    return {
      initial: { opacity: 0, y: 20 } as const,
      animate: { opacity: 1, y: 0 } as const,
      transition: { duration: DUR, ease: EASE, delay },
    };
  }

  return (
    <>
      <main className={cn("min-h-screen bg-[#080604]", montserrat.className)}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          dir={isHe ? "rtl" : "ltr"}
          className={cn(
            "min-h-[100dvh] flex items-center overflow-x-hidden",
            "pt-24 sm:pt-32 lg:pt-[200px] pb-16 sm:pb-24 lg:pb-36",
            "px-6 sm:px-10 lg:px-[60px] xl:px-[130px]",
          )}
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-12 items-center max-w-7xl mx-auto">

            {/* Image column — top on mobile, left on desktop (LTR) / right (RTL) */}
            <motion.div
              className="relative flex justify-center items-center order-1 lg:order-none py-2"
              {...fu(0)}
            >
              {/* Pulsing radial glow */}
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,126,34,0.18)_0%,transparent_65%)] pointer-events-none"
                animate={prefersReducedMotion ? undefined : { opacity: [0.4, 0.85, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Image
                src="/images/ebook-portfolio.png"
                alt="5 Ways to Get More Clients — Free Guide by Neo Zino"
                width={420}
                height={560}
                priority
                className="relative z-10 w-full max-w-[170px] sm:max-w-[220px] lg:max-w-[260px] drop-shadow-[0_32px_48px_rgba(0,0,0,0.7)]"
              />
            </motion.div>

            {/* Content column — bottom on mobile, right on desktop (LTR) / left (RTL) */}
            <div className="order-2 lg:order-none space-y-4">

              {/* Orange bar */}
              <motion.div
                className="w-10 h-[2px] bg-brand-orange rounded-full"
                {...fu(0.05)}
              />

              {/* Headline */}
              <motion.h1
                className="text-white text-[22px] sm:text-[32px] lg:text-[34px] xl:text-[38px] font-bold leading-[1.15] tracking-tight"
                {...fu(0.1)}
              >
                {fg.headline}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-white/60 text-sm sm:text-base leading-relaxed"
                {...fu(0.2)}
              >
                {fg.subheadline}
              </motion.p>

              {/* Inbox text */}
              <motion.p
                className="text-[#E67E22] text-sm font-medium"
                {...fu(0.25)}
              >
                {fg.inboxText}
              </motion.p>

              {/* CTA row */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                {...fu(0.3)}
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className={cn(
                    "bg-[#E67E22] text-white font-semibold rounded-[18px]",
                    "px-8 py-3.5 text-sm cursor-pointer whitespace-nowrap",
                    "shadow-[0px_10px_24px_rgba(230,126,34,0.4)]",
                    "hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200",
                    "w-full sm:w-auto",
                  )}
                >
                  {fg.cta}
                </button>

              </motion.div>

              {/* Stats */}
              <motion.div
                className="border-t border-white/10 pt-4"
                {...fu(0.4)}
              >
                <div className="space-y-1">
                  <p className="text-white text-lg font-bold">{fg.stats.time}</p>
                  <p className="text-white/40 text-[11px] uppercase tracking-widest">{fg.stats.timeLabel}</p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <Footer />
      </main>

      {/* ── Modal ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <GuideModal
            t={fg.modal}
            isHe={isHe}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
