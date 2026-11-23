import { calcRefund } from './refund';

const booking = {
  ref: 'ABC123',
  status: 'confirmed',
  departure: '2026-12-10T12:00:00Z',
  route: { from: 'Dover', to: 'Calais' },
  totalMinor: 9999,
  currency: 'GBP',
  passenger: { name: 'A', email: 'a@example.test' },
};

describe('calcRefund', () => {
  it('does not throw', () => {
    expect(() => calcRefund(booking)).not.toThrow();
  });

  it('returns a string', () => {
    expect(typeof calcRefund(booking, new Date('2026-12-01T00:00:00Z'))).toBe('string');
  });
});
