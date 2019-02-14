import { formatDateUTC } from './date.util';

describe('date utils', () => {
  describe('formatDate function', () => {
    it('with value "2019-01-01" it formats to "January 1, 2019"', () => {
      const result = formatDateUTC('2019-01-01');
      expect(result).toBe('January 1, 2019');
    });

    it('with value "2019-12-31" it formats to "December 31, 2019"', () => {
      const result = formatDateUTC('2019-12-31');
      expect(result).toBe('December 31, 2019');
    });
  });
});
