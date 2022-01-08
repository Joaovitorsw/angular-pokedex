import { PokemonTitleCasePipe } from './pokemon-title-case.pipe';

const PIPE = new PokemonTitleCasePipe();

describe('PokemonTitleCasePipe', () => {
  it('should return a title-case pokemon name', () => {
    const sample = 'bulbasaur';
    const expected = 'Bulbasaur';

    expect(PIPE.transform(sample)).toBe(expected);
  });
  it('should return a title-case string in mega-forms', () => {
    const sample = 'mega-charizard-x';
    const expected = 'Mega Charizard X';

    expect(PIPE.transform(sample)).toBe(expected);
  });
});
