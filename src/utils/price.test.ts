import { formatPrice } from './price';

describe('formatPrice', () => {
  it('formats GBP minor units', () => {
    expect(formatPrice(12345, 'GBP')).toBe('£123.45');
  });

  it('respects zero-decimal currencies', () => {
    expect(formatPrice(1500, 'JPY')).toMatch(/1,500$/);
  });
});
