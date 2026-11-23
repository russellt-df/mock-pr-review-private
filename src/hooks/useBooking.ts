import { useEffect, useState } from 'react';
import { getBooking, type Booking } from '../api/bookings';

export type BookingState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'ready'; booking: Booking };

export function useBooking(ref: string): BookingState {
  const [state, setState] = useState<BookingState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });

    async function load(): Promise<void> {
      try {
        const booking = await getBooking(ref, controller.signal);
        setState({ status: 'ready', booking });
      } catch (e) {
        if (controller.signal.aborted) return;
        setState({ status: 'error', error: e instanceof Error ? e : new Error(String(e)) });
      }
    }

    void load();
    return () => controller.abort();
  }, [ref]);

  return state;
}
