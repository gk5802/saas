/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTranslation } from "./TranslationProvider";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useTranslation();
  const currencies = ["INR", "USD", "EUR", "GBP", "JPY"];

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as any)}
      className="p-2 border rounded"
    >
      {currencies.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
