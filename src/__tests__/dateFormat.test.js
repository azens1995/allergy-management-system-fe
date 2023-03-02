import { format } from '../utils/dateFormat';

describe('Test Date format', () => {
  it('should format the date', () => {
    const originalDate = '2023-02-14 13:13:13T';
    const formattedDate = '2023-02-14';
    expect(format(originalDate)).toBe(formattedDate);
  });
});
