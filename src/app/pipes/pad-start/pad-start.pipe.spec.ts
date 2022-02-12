import { PadStartPipe } from './pad-start.pipe';

const PIPE = new PadStartPipe();

describe('PadStartPipe', () => {
  it('should return 00005', () => {
    const expected = '0005';
    expect(PIPE.transform(5, 4, '0')).toBe(expected);
  });

  it('should return  05', () => {
    const expected = '05';
    expect(PIPE.transform(5, 2, '0')).toBe(expected);
  });

  it('should return  005', () => {
    const expected = '005';
    expect(PIPE.transform(5, 3, '0')).toBe(expected);
  });
});
