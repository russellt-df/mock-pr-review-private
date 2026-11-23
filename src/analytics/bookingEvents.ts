import type { Booking } from '../api/bookings';
import { track } from './track';

export function trackBookingConfirmed(booking: Booking): void {
  track('booking_confirmed', {
    bookingRef: booking.ref,
    email: booking.passenger.email,
    passengerName: booking.passenger.name,
    value: (booking.totalMinor / 100).toFixed(2),
    currency: booking.currency,
    route: `${booking.route.from}-${booking.route.to}`,
  });
}
