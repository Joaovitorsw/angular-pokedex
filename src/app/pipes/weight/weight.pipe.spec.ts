import { WeightPipe } from './weight.pipe';

const PIPE = new WeightPipe();
describe('WeightPipePipe', () => {
  it('should return 0.0 Kg if value is 0', () => {
    const value = 0;
    const result = PIPE.transform(value);

    expect(result).toBe('0.0 Kg');
  });

  it('should return 1.0 Kg if value is 10', () => {
    const value = 10;
    const result = PIPE.transform(value);

    expect(result).toBe('1.0Kg');
  });

  it('should return 10.0 Kg if value is 100', () => {
    const value = 100;
    const result = PIPE.transform(value);

    expect(result).toBe('10.0Kg');
  });

  it('should return 100.0 Kg if value is 1000', () => {
    const value = 1000;
    const result = PIPE.transform(value);

    expect(result).toBe('100.0Kg');
  });
});
