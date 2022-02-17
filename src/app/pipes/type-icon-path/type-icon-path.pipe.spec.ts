import { TypeIconPathPipe } from './type-icon-path.pipe';

const PIPE = new TypeIconPathPipe();

describe('TypeIconPathPipe', () => {
  it('should return the correct icon path', () => {
    const sample = 'fire';
    const result = PIPE.transform(sample);
    expect(result).toEqual(PIPE.BASE_URL + sample + PIPE.EXTENSION);
  });
});
