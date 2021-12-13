import { ComponentFixture, TestBed } from '@angular/core/testing';
import PokeAPI from 'pokedex-promise-v2';
import { pokemonsMock } from 'src/app/mocks/pokemon-mocks';
import { SpritePathPipe } from 'src/app/pipes/sprite-path/sprite-path.pipe';
import { TypeIconPathPipe } from 'src/app/pipes/type-icon-path/type-icon-path.pipe';
import { instance, mock } from 'ts-mockito';
import { PokemonCardComponent } from './pokemon-card.component';

const componentTemplateTest = ` 
<h1>{{ pokemon?.name }}</h1>
<p>{{ pokemon?.id }}</p>
<div class="{{ slot.type.name }}  type " *ngFor="let slot of pokemon?.types">
  <div class="icon {{ slot.type.name }}">
    <img [src]="slot.type.name | typeIconPath" alt="" />
  </div>
  <p>{{ slot.type.name }}</p>
</div>
<p>{{ pokemon?.weight }}</p>
<p>{{ pokemon?.height }}</p>
`;

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let spritePathMock: SpritePathPipe;
  let typePathMock: TypeIconPathPipe;
  beforeEach(async () => {
    spritePathMock = mock(SpritePathPipe);
    typePathMock = mock(TypeIconPathPipe);

    const spritePathMockInstance = instance(spritePathMock);
    const typePathMockInstance = instance(typePathMock);

    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent, SpritePathPipe, TypeIconPathPipe],
      providers: [
        { provide: PokeAPI, useValue: new PokeAPI() },
        { provide: SpritePathPipe, useValue: spritePathMockInstance },
        { provide: TypeIconPathPipe, useValue: typePathMockInstance },
      ],
    })
      .overrideTemplate(PokemonCardComponent, componentTemplateTest)
      .compileComponents();
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
