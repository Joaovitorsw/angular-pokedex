import { SHORT_POKEMONS } from '@pokedex/database';
import { BULBASAUR } from '@pokedex/mocks';
import { render, screen } from '@testing-library/angular';
import { HeightWidgetModule } from 'app/pipes/height/height.widget.module';
import { PadStartWidgetModule } from 'app/pipes/pad-start/pad-start.widget.module';
import { PokemonTextTitleCaseWidgetModule } from 'app/pipes/pokemon-text-title-case/pokemon-text-title-case.widget.module';
import { WeightWidgetModule } from 'app/pipes/weight/weight.widget.module';
import { ShortPokemonCardComponent } from '.';
import { TypeCardWidgetModule } from '../type-card/type-card.widget.module';

const DEFAULT_DECLARATIONS = [ShortPokemonCardComponent];
const DEFAULT_IMPORTS = [
  PadStartWidgetModule,
  TypeCardWidgetModule,
  PokemonTextTitleCaseWidgetModule,
  WeightWidgetModule,
  HeightWidgetModule,
];
const DEFAULT_PROPERTY_VALUES = {
  pokemon: SHORT_POKEMONS[0],
};

describe('ShortPokemonCardComponent', () => {
  it('should render pokemon card', async () => {
    await render(ShortPokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: DEFAULT_PROPERTY_VALUES,
    });
    const $pokemonCard = screen.getByTestId('short-pokemon-card');
    expect($pokemonCard).toBeTruthy();
  });

  it('should pokemon name', async () => {
    await render(ShortPokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: DEFAULT_PROPERTY_VALUES,
    });
    const $pokemonName = screen.getByTestId('pokemon-name');
    const pokemonName = $pokemonName.innerHTML.toLowerCase().trim();
    const expectedName = BULBASAUR.name.toLowerCase().trim();
    expect(pokemonName).toBe(expectedName);
  });

  it('should pokemon weakness', async () => {
    await render(ShortPokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        ...DEFAULT_PROPERTY_VALUES,
        selectedWeakness: 'fire',
      },
    });

    const $pokemonWeakness = screen.getByTestId('pokemon-weakness');
    const $pokemonWeaknessImage = screen.getByTestId('weakness-image');

    expect($pokemonWeakness).toBeTruthy();
    expect($pokemonWeaknessImage).toBeTruthy();
  });
});
