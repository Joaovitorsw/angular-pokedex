import { WeightPipe } from './weight.pipe';

describe('WeightPipePipe', () => {
  it('create an instance', () => {
    const pipe = new WeightPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 0.0 Kg if value is 0', () => {
    const pipe = new WeightPipe();
    const value = 0;
    const result = pipe.transform(value);

    expect(result).toBe('0.0 Kg');
  });

  it('should return 1.0 Kg if value is 10', () => {
    const pipe = new WeightPipe();
    const value = 10;
    const result = pipe.transform(value);

    expect(result).toBe('1.0Kg');
  });

  it('should return 10.0 Kg if value is 100', () => {
    const pipe = new WeightPipe();
    const value = 100;
    const result = pipe.transform(value);

    expect(result).toBe('10.0Kg');
  });

  it('should return 100.0 Kg if value is 1000', () => {
    const pipe = new WeightPipe();
    const value = 1000;
    const result = pipe.transform(value);

    expect(result).toBe('100.0Kg');
  });
});
