import { FlavorTextPipe } from './flavor-text.pipe';

const pipe = new FlavorTextPipe();

describe('FlavorTextPipe', () => {
  it('should return transformed value', () => {
    const value = '$effect_chance%: -----|--';
    const expected = 'effect:';
    expect(pipe.transform(value)).toEqual(expected);
  });
});
