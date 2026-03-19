"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Montserrat } from "next/font/google";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

/* ─── Data ─────────────────────────────────────────────────────────────── */

interface SocialLink {
  platform: string;
  label: string;
  sublabel: string;
  icon: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    label: "LinkedIn",
    sublabel: "Connect with me",
    icon: "mdi:linkedin",
    href: "https://www.linkedin.com/in/neozino/",
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    sublabel: "+972 52 593 0575",
    icon: "mdi:whatsapp",
    href: "https://wa.me/972525930575",
  },
  {
    platform: "email",
    label: "Email",
    sublabel: "neozi2014@gmail.com",
    icon: "mdi:email-outline",
    href: "mailto:neozi2014@gmail.com",
  },
  {
    platform: "github",
    label: "GitHub",
    sublabel: "See my code",
    icon: "mdi:github",
    href: "https://github.com/NeoZi12",
  },
];

/* ─── SocialLink ────────────────────────────────────────────────────────── */

function SocialLinkItem({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.href}
      target={link.platform === "email" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="flex items-center gap-4 group w-fit"
    >
      <div
        className={cn(
          "w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shrink-0",
          "shadow-[0_4px_16px_rgba(230,126,34,0.4)]",
          "group-hover:shadow-[0_6px_24px_rgba(230,126,34,0.65)] transition-shadow duration-200"
        )}
      >
        <Icon icon={link.icon} width={22} height={22} className="text-white" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-white font-semibold text-sm">{link.label}</span>
        <span className="text-white/50 text-xs">{link.sublabel}</span>
      </div>
    </a>
  );
}

/* ─── ContactSection ────────────────────────────────────────────────────── */

type FormStatus = "idle" | "sending" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields(fields: { name: string; email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (fields.name.trim().length === 0) {
    errors.name = "Please enter your full name.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (fields.email.trim().length === 0) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (fields.message.trim().length === 0) {
    errors.message = "Please type your message.";
  }
  return errors;
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full bg-transparent border-0 border-b",
    hasError ? "border-red-400" : "border-white/20",
    "px-0 py-3 text-white text-sm placeholder:text-white/35",
    "outline-none focus:border-brand-orange",
    "transition-colors duration-200"
  );
}

export default function ContactSection() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const updated = { ...fields, [e.target.name]: e.target.value };
    setFields(updated);
    if (touched[e.target.name as keyof typeof touched]) {
      setErrors(validateFields(updated));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof typeof touched;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateFields(fields));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const validationErrors = validateFields(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");
    try {
      await emailjs.send(
        "service_jfqyste",
        "template_8vsa8pv",
        {
          from_name: fields.name,
          from_email: fields.email,
          message: fields.message,
        },
        "knK3azBapROlEFyqf"
      );
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className={cn(
        "bg-gradient-to-b from-contact-dark to-contact-warm",
        "min-h-screen lg:h-screen flex flex-col",
        montserrat.className
      )}
    >
      {/* Navbar spacer */}
      <div className="hidden lg:block h-[90px] shrink-0" />

      {/* Content */}
      <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-[130px] py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full max-w-[1200px] mx-auto">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-[48px] font-semibold text-white leading-tight">
                Let&apos;s work{" "}
                <span className="text-brand-orange">together</span>
              </h2>
              <p className="mt-3 text-white/60 text-base leading-relaxed max-w-[380px]">
                If you have a project in mind, I&apos;d love to hear from you.
              </p>
            </div>

            {/* Orange divider */}
            <div className="w-12 h-[2px] bg-brand-orange rounded-full" />

            {/* Social links */}
            <div className="flex flex-col gap-5">
              {socialLinks.map((link) => (
                <SocialLinkItem key={link.platform} link={link} />
              ))}
            </div>
          </div>

          {/* ── Right column ── */}
          <div>
            <h3 className="text-white font-bold text-xl mb-8">
              Send Message
            </h3>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <input
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Full Name"
                  className={inputClass(!!errors.name)}
                />
                {errors.name && (
                  <span className="text-red-400 text-xs mt-0.5">{errors.name}</span>
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
                  placeholder="Email Address"
                  className={inputClass(!!errors.email)}
                />
                {errors.email && (
                  <span className="text-red-400 text-xs mt-0.5">{errors.email}</span>
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
                  placeholder="Type your message..."
                  className={cn(inputClass(!!errors.message), "resize-none")}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs mt-0.5">{errors.message}</span>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={status === "sending" || Object.keys(validateFields(fields)).length > 0}
                  className={cn(
                    "self-start inline-flex items-center gap-2",
                    "bg-brand-orange text-white font-semibold text-sm",
                    "rounded-[18px] px-8 py-3.5",
                    "shadow-[0px_10px_24px_rgba(230,126,34,0.4)]",
                    "hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200",
                    "disabled:opacity-60 disabled:cursor-not-allowed"
                  )}
                >
                  {status === "sending" ? (
                    <>
                      <Icon
                        icon="lucide:loader-circle"
                        width={16}
                        height={16}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {status === "success" && (
                  <p className="flex items-center gap-2 text-green-400 text-sm font-medium">
                    <Icon icon="lucide:check-circle" width={16} height={16} />
                    Message sent! I&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-red-400 text-sm font-medium">
                    <Icon icon="lucide:alert-circle" width={16} height={16} />
                    Something went wrong. Please try again or reach out directly.
                  </p>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
