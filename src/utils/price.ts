/** Formats minor units using the currency's own decimal places (GBP 2, JPY 0, ...). */
export function formatPrice(minor: number, currency: string, locale = 'en-GB'): string {
  const fmt = new Intl.NumberFormat(locale, { style: 'currency', currency });
  const digits = fmt.resolvedOptions().maximumFractionDigits ?? 2;
  return fmt.format(minor / 10 ** digits);
}
