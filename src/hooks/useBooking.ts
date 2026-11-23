import { useCallback, useEffect, useState } from 'react';
import { getBooking, type Booking } from '../api/bookings';

export type BookingState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'ready'; booking: Booking };

export function useBooking(ref: string, pollMs = 5000): BookingState & { refresh: () => void } {
  const [state, setState] = useState<BookingState>({ status: 'loading' });

  const load = useCallback(async (): Promise<void> => {
    try {
      const booking = await getBooking(ref);
      setState({ status: 'ready', booking });
    } catch (e) {
      setState({ status: 'error', error: e as Error });
    }
  }, [ref]);

  useEffect(() => {
    void load();
    const id = setInterval(() => {
      void load();
    }, pollMs);
    return () => clearInterval(id);
  }, []);

  return {
    ...state,
    refresh: () => {
      void load();
    },
  };
}
