export const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

export const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0098,
  JPY: 1.77,
};

export type SupportedCurrency = keyof typeof exchangeRates;

export function formatCurrency(amount: number, currency: SupportedCurrency) {
  const rate = exchangeRates[currency] || 1;
  const symbol = currencySymbols[currency] || "";
  const converted = amount * rate;
  return `${symbol}${converted.toFixed(2)}`;
}
