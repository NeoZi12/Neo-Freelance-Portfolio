"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  Suspense,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { type Locale, translations } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function LanguageProviderInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawLang = searchParams.get("lang");
  const initialLocale: Locale =
    rawLang === "en" || rawLang === "he" ? rawLang : "en";

  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Keep locale in sync if the URL changes externally (back/forward nav)
  useEffect(() => {
    const lang = searchParams.get("lang");
    if (lang === "en" || lang === "he") {
      setLocaleState(lang);
    } else {
      setLocaleState("en");
    }
  }, [searchParams]);

  function setLocale(next: Locale) {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", next);
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <LanguageProviderInner>{children}</LanguageProviderInner>
    </Suspense>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
