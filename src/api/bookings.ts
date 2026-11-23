import { fetchJson } from './client';

export interface Booking {
  ref: string;
  status: 'confirmed' | 'cancelled';
  /** ISO-8601, UTC */
  departure: string;
  route: { from: string; to: string };
  /** Minor units (pence, cents) */
  totalMinor: number;
  currency: string;
  passenger: { name: string; email: string };
}

export function getBooking(ref: string, signal?: AbortSignal, token?: string): Promise<Booking> {
  return fetchJson<Booking>(`/bookings/${encodeURIComponent(ref)}`, { signal, token });
}
