import { PadStartPipe } from './pad-start.pipe';

describe('PadStartPipe', () => {
  it('create an instance', () => {
    const pipe = new PadStartPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 00005', () => {
    const pipe = new PadStartPipe();
    expect(pipe.transform(5, 5, '0')).toBe('00005');
  });

  it('should return  05', () => {
    const pipe = new PadStartPipe();
    expect(pipe.transform(5, 2, '0')).toBe('05');
  });

  it('should return  005', () => {
    const pipe = new PadStartPipe();
    expect(pipe.transform(5, 3, '0')).toBe('005');
  });
});
