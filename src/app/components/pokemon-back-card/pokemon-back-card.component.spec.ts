import { MEGA_CHARIZARD_X } from '@pokedex/mocks';
import { TypeIconPathPipe } from '@pokedex/pipes';
import { render, screen } from '@testing-library/angular';
import { PokemonBackCardComponent } from '.';
import { DamageRelationsCardComponent } from '../damage-relations-card';

const DEFAULT_DECLARATIONS = [DamageRelationsCardComponent, TypeIconPathPipe];
describe('PokemonBackCardComponent', () => {
  it('should created ', async () => {
    await render(PokemonBackCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });

    const double_damage_from = screen.getAllByTestId('double_damage_from');
    const half_damage_from = screen.getAllByTestId('half_damage_from');
    expect(double_damage_from.length).toBe(2);
    expect(half_damage_from.length).toBe(2);
  });

  it('should pokemon double damage from ', async () => {
    await render(PokemonBackCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });

    const double_damage_from = screen.getAllByTestId('double_damage_from');
    const expectedValues = ['ground,rock,water', 'ice,dragon,fairy'];

    const sample = double_damage_from.every((element, index) => {
      const expectedValue = expectedValues[index];
      const sample = element.innerHTML.includes(expectedValue);
      return sample;
    });

    expect(sample).toBe(true);
  });

  it('should pokemon half damage from ', async () => {
    await render(PokemonBackCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });

    const half_damage_from = screen.getAllByTestId('half_damage_from');
    const expectedValues = [
      'bug,steel,fire,grass,ice,fairy',
      'fire,water,grass,electric',
    ];

    const sample = half_damage_from.every((element, index) => {
      const expectedValue = expectedValues[index];
      const sample = element.innerHTML.includes(expectedValue);
      return sample;
    });

    expect(sample).toBe(true);
  });
});
