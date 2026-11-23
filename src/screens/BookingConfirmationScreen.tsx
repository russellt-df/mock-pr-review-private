import type { ReactElement } from 'react';
import { useBooking } from '../hooks/useBooking';
import { formatPrice } from '../utils/price';
import { Text, View } from '../ui';

export function BookingConfirmationScreen({ bookingRef }: { bookingRef: string }): ReactElement {
  const state = useBooking(bookingRef);

  if (state.status === 'loading') return <Text>Loading…</Text>;
  if (state.status === 'error') return <Text>Something went wrong</Text>;

  const { booking } = state;
  return (
    <View>
      <Text>
        {booking.route.from} to {booking.route.to}
      </Text>
      <Text>{formatPrice(booking.totalMinor, booking.currency)}</Text>
    </View>
  );
}
