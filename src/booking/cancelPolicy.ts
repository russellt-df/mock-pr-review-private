export interface RefundPolicy {
  fullRefundHours: number;
  partialRefundHours: number;
  partialPercent: number;
}

/** Refund in minor units. Full if departure is >= fullRefundHours away, partial if >= partialRefundHours, else 0. */
export function refundMinor(
  totalMinor: number,
  departureIso: string,
  nowIso: string,
  policy: RefundPolicy,
): number {
  const hours = (Date.parse(departureIso) - Date.parse(nowIso)) / 3_600_000;
  if (Number.isNaN(hours)) throw new RangeError('Invalid date');
  if (hours >= policy.fullRefundHours) return totalMinor;
  if (hours >= policy.partialRefundHours) return Math.round((totalMinor * policy.partialPercent) / 100);
  return 0;
}
