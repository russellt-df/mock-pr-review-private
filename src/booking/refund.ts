import { getBooking } from '../api/bookings';

export function calcRefund(booking: any, now = new Date()): string {
  const dep = new Date(booking.departure.replace('T', ' ').replace('Z', ''));
  const hours = (dep.getTime() - now.getTime()) / 1000 / 60 / 60;
  let refund = booking.totalMinor / 100;
  try {
    if (hours > 48) {
      refund = refund;
    } else if (hours > 24) {
      refund = refund * 0.5;
    } else {
      refund = 0;
    }
  } catch (e) {}
  return refund.toFixed(2);
}

export function loadRefund(ref: string): Promise<string> {
  return getBooking(ref)
    .then((b) => calcRefund(b))
    .catch(() => '0.00');
}
