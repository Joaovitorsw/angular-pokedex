import { PokemonTitleCasePipe } from './pokemon-title-case.pipe';

describe('PokemonTitleCasePipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonTitleCasePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return a title-case pokemon name', () => {
    const pipe = new PokemonTitleCasePipe();
    const sample = 'bulbasaur';
    const expected = 'Bulbasaur';
    expect(pipe.transform(sample)).toBe(expected);
  });
  it('should return a title-case string in mega-forms', () => {
    const pipe = new PokemonTitleCasePipe();
    const sample = 'mega-charizard-x';
    const expected = 'Mega Charizard X';
    expect(pipe.transform(sample)).toBe(expected);
  });
});
