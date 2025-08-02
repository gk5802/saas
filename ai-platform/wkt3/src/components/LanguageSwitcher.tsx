/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTranslation } from "./TranslationProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useTranslation();

  const langs = ["en", "hi", "fr", "es", "zh"];

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as any)}
      className="p-2 border rounded"
    >
      {langs.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
