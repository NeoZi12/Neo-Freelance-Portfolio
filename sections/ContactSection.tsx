"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeLeft, fadeRight, viewport } from "@/lib/motion";

const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "contact_last_sent";
const MSG_MAX = 500;

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

/* ─── Static social data (icons / hrefs / platform keys) ───────────────── */

const socialMeta = [
  { platform: "linkedin", label: "LinkedIn",  icon: "mdi:linkedin",      href: "https://www.linkedin.com/in/neozino/" },
  { platform: "whatsapp", label: "WhatsApp",  icon: "mdi:whatsapp",      href: "https://wa.me/972525930575",          fixedSublabel: "+972 52 593 0575" },
  { platform: "email",    label: "Email",     icon: "mdi:email-outline",  href: "mailto:neozi2014@gmail.com",          fixedSublabel: "neozi2014@gmail.com" },
  { platform: "github",   label: "GitHub",    icon: "mdi:github",        href: "https://github.com/NeoZi12" },
] as const;

/* ─── SocialLinkItem ────────────────────────────────────────────────────── */

function SocialLinkItem({
  platform, label, icon, href, sublabel, isHe,
}: {
  platform: string; label: string; icon: string;
  href: string; sublabel: string | null; isHe: boolean;
}) {
  return (
    <a
      href={href}
      target={platform === "email" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className={cn("flex items-center gap-4 group w-fit", isHe && "flex-row-reverse self-end")}
    >
      <div className={cn(
        "w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shrink-0",
        "shadow-[0_4px_16px_rgba(230,126,34,0.4)]",
        "group-hover:shadow-[0_6px_24px_rgba(230,126,34,0.65)] transition-shadow duration-200",
      )}>
        <Icon icon={icon} width={22} height={22} className="text-white" />
      </div>
      <div className={cn("flex flex-col gap-0.5", isHe && "items-end")}>
        <span className="text-white font-semibold text-sm">{label}</span>
        {sublabel && <span className="text-white/50 text-xs">{sublabel}</span>}
      </div>
    </a>
  );
}

/* ─── Validation ────────────────────────────────────────────────────────── */

interface FieldErrors { name?: string; email?: string; message?: string; }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields(
  fields: { name: string; email: string; message: string },
  v: { nameRequired: string; nameMin: string; emailRequired: string; emailInvalid: string; messageRequired: string; messageMax: string },
): FieldErrors {
  const errors: FieldErrors = {};
  if (fields.name.trim().length === 0)       errors.name = v.nameRequired;
  else if (fields.name.trim().length < 2)    errors.name = v.nameMin;
  if (fields.email.trim().length === 0)      errors.email = v.emailRequired;
  else if (!EMAIL_RE.test(fields.email.trim())) errors.email = v.emailInvalid;
  if (fields.message.trim().length === 0)    errors.message = v.messageRequired;
  else if (fields.message.length > MSG_MAX)  errors.message = v.messageMax.replace("{max}", String(MSG_MAX));
  return errors;
}

function inputClass(hasError: boolean, isHe: boolean) {
  return cn(
    "w-full bg-transparent border-0 border-b",
    hasError ? "border-red-400" : "border-white/20",
    "px-0 py-3 text-white text-sm placeholder:text-white/35",
    "outline-none focus:border-brand-orange",
    "transition-colors duration-200",
    isHe && "text-right",
  );
}

/* ─── ContactSection ────────────────────────────────────────────────────── */

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";
  const tc = t.contact;

  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [cooldownSecs, setCooldownSecs] = useState(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const validate = (f: typeof fields) => validateFields(f, tc.validation);

  useEffect(() => {
    if (cooldownSecs <= 0) return;
    const id = setTimeout(() => setCooldownSecs((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldownSecs]);

  useEffect(() => {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) ?? 0);
    const remaining = Math.ceil((last + COOLDOWN_MS - Date.now()) / 1000);
    if (remaining > 0) setCooldownSecs(remaining);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const updated = { ...fields, [e.target.name]: e.target.value };
    setFields(updated);
    if (touched[e.target.name as keyof typeof touched]) setErrors(validate(updated));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof typeof touched;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(fields));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypotRef.current?.value) { setStatus("success"); return; }
    if (cooldownSecs > 0) return;
    setTouched({ name: true, email: true, message: true });
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setStatus("sending");
    try {
      await emailjs.send("service_jfqyste", "template_8vsa8pv", {
        user_name: fields.name,
        user_email: fields.email,
        message: fields.message,
      }, "knK3azBapROlEFyqf");
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setErrors({});
      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      setCooldownSecs(Math.ceil(COOLDOWN_MS / 1000));
    } catch {
      setStatus("error");
    }
  }

  // Merge static social meta with locale sublabels
  const socialLinks = socialMeta.map((s) => ({
    ...s,
    sublabel: "fixedSublabel" in s
      ? s.fixedSublabel
      : isHe ? null : tc.social[s.platform as keyof typeof tc.social],
  }));

  /*
   * Direction-aware variants: left column fades from its visual side,
   * right column fades from its visual side. Swapped for RTL (Hebrew).
   */
  const leftColVariant  = isHe ? fadeRight : fadeLeft;
  const rightColVariant = isHe ? fadeLeft  : fadeRight;

  return (
    <section
      id="contact"
      className={cn(
        "bg-gradient-to-b from-contact-dark to-contact-warm scroll-mt-16 lg:scroll-mt-0",
        "min-h-screen lg:h-screen flex flex-col",
        montserrat.className,
      )}
    >
      <div className="hidden lg:block h-[90px] shrink-0" />

      <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-[130px] py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full max-w-[1200px] mx-auto">

          {/* ── Left column ── */}
          <motion.div
            className={cn("flex flex-col gap-8", isHe && "items-end")}
            variants={leftColVariant}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            {/* Heading block */}
            <div
              className={cn("w-full", isHe && "text-right")}
              dir={isHe ? "rtl" : "ltr"}
            >
              <h2 className="text-[48px] font-semibold text-white leading-tight">
                {tc.heading1}{" "}
                <span className="text-brand-orange">{tc.heading2}</span>
              </h2>
              <p className="mt-3 text-white/60 text-base leading-relaxed max-w-[380px]">
                {tc.subheading}
              </p>
            </div>

            {/* Orange divider */}
            <div className={cn("w-12 h-[2px] bg-brand-orange rounded-full", isHe && "ml-auto")} />

            {/* Social links */}
            <div className={cn("flex flex-col gap-5", isHe && "items-end")}>
              {socialLinks.map((link) => (
                <SocialLinkItem
                  key={link.platform}
                  platform={link.platform}
                  label={link.label}
                  icon={link.icon}
                  href={link.href}
                  sublabel={link.sublabel}
                  isHe={isHe}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Right column (form) ── */}
          <motion.div
            dir={isHe ? "rtl" : "ltr"}
            variants={rightColVariant}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <h3 className={cn("text-white font-bold text-xl mb-8", isHe && "text-right")}>
              {tc.formHeading}
            </h3>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <input
                ref={honeypotRef}
                name="_trap"
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="new-password"
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              />

              {/* Name */}
              <div className="flex flex-col gap-1">
                <input
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={tc.placeholders.name}
                  dir={isHe ? "rtl" : "ltr"}
                  className={inputClass(!!(touched.name && errors.name), isHe)}
                />
                {touched.name && errors.name && (
                  <span className={cn("text-red-400 text-xs mt-0.5", isHe && "text-right")}>{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <input
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={tc.placeholders.email}
                  dir={isHe ? "rtl" : "ltr"}
                  className={inputClass(!!(touched.email && errors.email), isHe)}
                />
                {touched.email && errors.email && (
                  <span className={cn("text-red-400 text-xs mt-0.5", isHe && "text-right")}>{errors.email}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <textarea
                  name="message"
                  rows={4}
                  value={fields.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={tc.placeholders.message}
                  maxLength={MSG_MAX}
                  dir={isHe ? "rtl" : "ltr"}
                  className={cn(inputClass(!!(touched.message && errors.message), isHe), "resize-none")}
                />
                <div className="flex justify-between items-center">
                  {touched.message && errors.message ? (
                    <span className={cn("text-red-400 text-xs", isHe && "text-right w-full")}>{errors.message}</span>
                  ) : (
                    <span />
                  )}
                  {fields.message.length > MSG_MAX - 100 && (
                    <span className={cn(
                      "text-xs tabular-nums",
                      fields.message.length >= MSG_MAX ? "text-red-400" : "text-white/40",
                    )}>
                      {fields.message.length}/{MSG_MAX}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={status === "sending" || cooldownSecs > 0 || Object.keys(validate(fields)).length > 0}
                  className={cn(
                    "inline-flex items-center gap-2",
                    isHe ? "ml-auto" : "self-start",
                    "bg-brand-orange text-white font-semibold text-sm",
                    "rounded-[18px] px-8 py-3.5",
                    "shadow-[0px_10px_24px_rgba(230,126,34,0.4)]",
                    "hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                  )}
                >
                  {status === "sending" ? (
                    <>
                      <Icon icon="lucide:loader-circle" width={16} height={16} className="animate-spin" />
                      {tc.sending}
                    </>
                  ) : cooldownSecs > 0 ? (
                    tc.cooldown.replace("{secs}", String(cooldownSecs))
                  ) : (
                    tc.submit
                  )}
                </button>

                {status === "success" && (
                  <p className={cn("flex items-center gap-2 text-green-400 text-sm font-medium", isHe && "flex-row-reverse")}>
                    <Icon icon="lucide:check-circle" width={16} height={16} />
                    {tc.success}
                  </p>
                )}
                {status === "error" && (
                  <p className={cn("flex items-center gap-2 text-red-400 text-sm font-medium", isHe && "flex-row-reverse")}>
                    <Icon icon="lucide:alert-circle" width={16} height={16} />
                    {tc.error}
                  </p>
                )}
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
