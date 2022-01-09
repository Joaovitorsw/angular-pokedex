import { HeightPipe } from './height.pipe';

const PIPE = new HeightPipe();

describe('HeightPipe', () => {
  it('should return 0.0 cm if value is 0', () => {
    const value = 0;
    const result = PIPE.transform(value);

    expect(result).toBe('0.0 cm');
  });

  it('should return 30 cm if value is 3', () => {
    const value = 3;
    const result = PIPE.transform(value);

    expect(result).toBe('30 cm');
  });

  it('should return 1.00 m if value is 10', () => {
    const value = 10;
    const result = PIPE.transform(value);

    expect(result).toBe('1.00 m');
  });

  it('should return 10.00 m if value is 100', () => {
    const value = 100;
    const result = PIPE.transform(value);

    expect(result).toBe('10.00 m');
  });

  it('should return 100.00 m if value is 1000', () => {
    const value = 1000;
    const result = PIPE.transform(value);

    expect(result).toBe('100.00 m');
  });
});
