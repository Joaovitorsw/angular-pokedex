import { ComponentFixture, TestBed } from '@angular/core/testing';
import PokeAPI from 'pokedex-promise-v2';
import { pokemonsMock } from 'src/app/mocks/pokemon-mocks';
import { SpritePathPipe } from 'src/app/pipes/sprite-path/sprite-path.pipe';
import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent, SpritePathPipe],
      providers: [{ provide: PokeAPI, useValue: new PokeAPI() }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemonsMock[1];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should have as pokemon`, () => {
    expect(component.pokemon).toEqual(pokemonsMock[1]);
  });

  it('should render pokemon name', () => {
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      `${component.pokemon.name}`
    );
  });
});
