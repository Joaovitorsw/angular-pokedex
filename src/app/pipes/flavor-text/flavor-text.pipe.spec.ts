import { FlavorTextPipe } from '..';

const PIPE = new FlavorTextPipe();

describe('FlavorTextPipe', () => {
  it('should return transformed value', () => {
    const value = '$effect_chance%: -----|--';
    const expected = 'effect:';
    expect(PIPE.transform(value)).toEqual(expected);
  });
});
