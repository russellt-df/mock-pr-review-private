export function formatPrice(minor: number, currency: string): string {
  return `${currency} ${(minor / 100).toFixed(2)}`;
}
