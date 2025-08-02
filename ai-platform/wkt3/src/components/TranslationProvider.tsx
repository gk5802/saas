"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/lib/languages";

type Lang = keyof typeof translations;
type Currency = keyof typeof import("@/lib/currencies").currencySymbols;

const LangContext = createContext({
  lang: "en" as Lang,
  setLang: (l: Lang) => {},
  t: (key: string) => key,
  currency: "INR" as Currency,
  setCurrency: (c: Currency) => {},
});

export function useTranslation() {
  return useContext(LangContext);
}

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const [currency, setCurrency] = useState<Currency>("INR");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Lang;
    const storedCurrency = localStorage.getItem("currency") as Currency;
    if (storedLang) setLang(storedLang);
    if (storedCurrency) setCurrency(storedCurrency);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    localStorage.setItem("currency", currency);
  }, [lang, currency]);

  const t = (key: string) =>
    (translations[lang] as Record<string, string>)[key] || key;

  return (
    <LangContext.Provider value={{ lang, setLang, t, currency, setCurrency }}>
      {children}
    </LangContext.Provider>
  );
}
