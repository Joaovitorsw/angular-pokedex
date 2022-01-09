import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { ColorProgressBarDirective } from '@pokedex/directives';
import { MEGA_CHARIZARD_X } from '@pokedex/mocks';
import {
  HeightPipe,
  PadStartPipe,
  PokemonTitleCasePipe,
  SpritePathPipe,
  TypeIconPathPipe,
  WeightPipe,
} from '@pokedex/pipes';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { PokemonCardComponent } from '.';
import { TypeCardComponent } from '../type-card/type-card.component';

const DEFAULT_DECLARATIONS = [
  PokemonCardComponent,
  TypeCardComponent,
  SpritePathPipe,
  TypeIconPathPipe,
  PokemonTitleCasePipe,
  ColorProgressBarDirective,
  PadStartPipe,
  WeightPipe,
  HeightPipe,
];

const DEFAULT_IMPORTS = [
  MatProgressSpinnerModule,
  MatProgressBarModule,
  RouterTestingModule,
  HttpClientTestingModule,
];

describe('PokemonCardComponent', () => {
  it(`should render spinner pokemon image`, async () => {
    await render(PokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });
    const $spinner = screen.getByTestId('pokemon-spinner-image');
    expect($spinner).toBeTruthy();
  });

  it('should render pokemon name', async () => {
    await render(PokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });
    const $name = screen.getByTestId('pokemon-name');
    const expected = new PokemonTitleCasePipe().transform(
      MEGA_CHARIZARD_X.name
    ) as string;
    expect($name.textContent).toEqual(expected);
  });

  it('should render pokemon id', async () => {
    await render(PokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });
    const $id = screen.getByTestId('pokemon-id');
    const expected = `#${
      new PadStartPipe().transform(MEGA_CHARIZARD_X.id, 3, '0') as string
    }`;
    expect($id.textContent).toEqual(expected);
  });

  it('should render pokemon weight', async () => {
    await render(PokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });
    const $weight = screen.getByTestId('pokemon-weight');
    const expected = new WeightPipe().transform(MEGA_CHARIZARD_X.weight);
    expect($weight.textContent?.trim()).toEqual(expected);
  });

  it('should render pokemon height', async () => {
    await render(PokemonCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        pokemon: MEGA_CHARIZARD_X,
      },
    });
    const $height = screen.getByTestId('pokemon-height');
    const expected = new HeightPipe().transform(MEGA_CHARIZARD_X.height);
    expect($height.textContent?.trim()).toEqual(expected);
  });
});
