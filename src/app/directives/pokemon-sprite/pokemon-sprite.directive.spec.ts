import { SHORT_POKEMONS } from '@pokedex/database';
import { fireEvent, render, screen } from '@testing-library/angular';
import { PokemonSpriteDirective } from './pokemon-sprite.directive';

const BASE_URL =
  'https://raw.githubusercontent.com/Joaovitorsw/poke-gifs/main/normal/';
const EXTENSION = '.gif';

describe('PokemonSpriteDirective', () => {
  it('should return pokemon image url', async () => {
    const POKEMON_NAME = 'charmander';

    const TEST_TEMPLATE = `
    <img
      data-testid="image"
      [pxPokemonSpritePokemonName]="'${POKEMON_NAME}'"
    />
`;

    await render(TEST_TEMPLATE, {
      declarations: [PokemonSpriteDirective],
    });

    const image = screen.getByTestId<HTMLImageElement>('image');

    const expected = BASE_URL + POKEMON_NAME + EXTENSION;
    
    expect(image.src).toBe(expected);
  });

  it('should return pokemon image url when pokemon name is empty', async () => {
    const POKEMON_ID = 3;
    const TEST_TEMPLATE = `
    <img
      data-testid="image"
      [pxPokemonSprite]="${SHORT_POKEMONS[POKEMON_ID]}"
    />
`;
    await render(TEST_TEMPLATE, {
      declarations: [PokemonSpriteDirective],
    });

    const image = screen.getByTestId<HTMLImageElement>('image');

    fireEvent.error(image);

    const expected = SHORT_POKEMONS[POKEMON_ID].sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default!;

    expect(image.src).toBe(expected);
  });
});
