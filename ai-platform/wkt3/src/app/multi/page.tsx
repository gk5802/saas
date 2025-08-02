"use client";

import { useTranslation } from "@/components/TranslationProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { formatCurrency } from "@/lib/currencies";

export default function Home() {
  const { t, currency } = useTranslation();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("welcome")}</h1>
      <p>
        {t("login")} | {t("register")}
      </p>
      <p className="mt-4">{formatCurrency(1000, currency)}</p>

      <div className="flex gap-4 mt-4">
        <LanguageSwitcher />
        <CurrencySwitcher />
      </div>
    </div>
  );
}
