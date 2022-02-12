import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { MEGA_CHARIZARD_X } from '@pokedex/mocks';
import {
  HeightPipe,
  PadStartPipe,
  PokemonTitleCasePipe,
  TypeIconPathPipe,
  WeightPipe,
} from '@pokedex/pipes';
import { render, screen } from '@testing-library/angular';
import { PokemonSpriteDirective } from 'app/directives/pokemon-sprite';
import { PokemonCardComponent } from '.';
import { TypeCardComponent } from '..';

const DEFAULT_DECLARATIONS = [
  TypeIconPathPipe,
  PokemonTitleCasePipe,
  PokemonSpriteDirective,
  WeightPipe,
  PadStartPipe,
  HeightPipe,
  TypeCardComponent,
];
const DEFAULT_IMPORTS = [
  MatProgressSpinnerModule,
  MatProgressBarModule,
  RouterTestingModule,
  CommonModule,
];
describe('PokemonCardComponent', () => {
  it('should created pokemon card', async () => {
    await render(PokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });
    const pokemonCard = screen.getByTestId('pokemon-card');
    expect(pokemonCard).toBeTruthy();
  });

  it('should pokemon name', async () => {
    await render(PokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Charizard Mega X');
  });

  it('should pokemon weight', async () => {
    await render(PokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe(' 110.5Kg ');
  });
});
