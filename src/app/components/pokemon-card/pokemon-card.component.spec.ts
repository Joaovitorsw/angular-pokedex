import { ComponentFixture, TestBed } from '@angular/core/testing';
import { pokemonsMock } from 'src/app/mocks/pokemon-mocks';
import { PokemonTitleCasePipe } from 'src/app/pipes/pokemon-title-case/pokemon-title-case.pipe';
import { TypeIconPathPipe } from 'src/app/pipes/type-icon-path/type-icon-path.pipe';
import { PokemonCardComponent } from './pokemon-card.component';

const componentTemplateTest = ` 
<h1>{{ pokemon.name | pokemonTitleCase }}</h1>
<p>{{ pokemon.id }}</p>
<div class="{{ slot.type.name }}  type " *ngFor="let slot of pokemon?.types">
  <div class="icon {{ slot.type.name }}">
    <img [src]="slot.type.name | typeIconPath" alt="" />
  </div>
  <p>{{ slot.type.name }}</p>
</div>
<p>{{ pokemon.weight }}</p>
<p>{{ pokemon.height }}</p>

`;

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PokemonCardComponent,
        PokemonTitleCasePipe,
        TypeIconPathPipe,
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
    const pipe = new PokemonTitleCasePipe();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      `${pipe.transform(component.pokemon.name)}`
    );
  });
  it('should render pokemon type', () => {
    const types = component.pokemon.types.map((type) => type.type.name);
    types.forEach((type) => {
      const typeElement = fixture.nativeElement
        .querySelector(`.${type}`)
        ?.querySelector('p');
      expect(typeElement?.textContent).toContain(`${type}`);
    });
  });

  it('should render type image', () => {
    const type = component.pokemon.types[0].type.name;
    const typeElement = fixture.nativeElement.querySelector(`.${type} img`);
    const sample = typeElement.src;
    const expected = sample.includes(type);
    expect(expected);
  });
});
