import { refundMinor, type RefundPolicy } from './cancelPolicy';

const policy: RefundPolicy = { fullRefundHours: 48, partialRefundHours: 24, partialPercent: 50 };
const dep = '2026-12-10T12:00:00Z';
const hoursBefore = (h: number): string => new Date(Date.parse(dep) - h * 3_600_000).toISOString();

describe('refundMinor', () => {
  it('refunds in full at exactly 48h', () => {
    expect(refundMinor(9999, dep, hoursBefore(48), policy)).toBe(9999);
  });
  it('refunds half between 24h and 48h, rounded to a minor unit', () => {
    expect(refundMinor(9999, dep, hoursBefore(47), policy)).toBe(5000);
    expect(refundMinor(9999, dep, hoursBefore(24), policy)).toBe(5000);
  });
  it('refunds nothing under 24h or after departure', () => {
    expect(refundMinor(9999, dep, hoursBefore(23), policy)).toBe(0);
    expect(refundMinor(9999, dep, hoursBefore(-2), policy)).toBe(0);
  });
  it('throws on invalid dates', () => {
    expect(() => refundMinor(100, 'nope', dep, policy)).toThrow(RangeError);
  });
});
