"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { type Locale, translations } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readLocaleFromURL(): Locale {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return lang === "he" ? "he" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  // Server + first client render default to "en" so the entire page can be
  // statically rendered. Reading useSearchParams() during render would force
  // the whole tree to CSR and gut LCP. Hebrew deep-links sync via the effect
  // below; the brief flash is the cost of getting SSR back.
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const fromUrl = readLocaleFromURL();
    if (fromUrl !== "en") setLocaleState(fromUrl);
  }, []);

  useEffect(() => {
    function onPopState() {
      setLocaleState(readLocaleFromURL());
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function setLocale(next: Locale) {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", next);
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    setLocaleState(next);
  }

  const value = useMemo(
    () => ({ locale, setLocale, t: translations[locale] }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
