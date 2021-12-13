import { TypeIconPathPipe } from './type-icon-path.pipe';

describe('TypeIconPathPipe', () => {
  let pipe = new TypeIconPathPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the correct icon path', () => {
    const sample = 'fire';
    const result = pipe.transform(sample);
    expect(result).toEqual(pipe.BASE_URL + sample + pipe.EXTENSION);
  });
});
