import { formatPrice } from './price';

describe('formatPrice', () => {
  it('formats GBP minor units', () => {
    expect(formatPrice(12345, 'GBP')).toBe('GBP 123.45');
  });
});
