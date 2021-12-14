import { ComponentFixture, TestBed } from '@angular/core/testing';
import { pokemonsMock } from 'src/app/mocks/pokemon-mocks';
import { PadStartPipe } from 'src/app/pipes/pad-start/pad-start.pipe';
import { PokemonTitleCasePipe } from 'src/app/pipes/pokemon-title-case/pokemon-title-case.pipe';
import { PokemonCardComponent } from './pokemon-card.component';

const componentTemplateTest = ` 
<h1>{{ pokemon.name | pokemonTitleCase }}</h1>
<p>{{ pokemon.id | padStart: 3:"0" }}</p>
<p>{{ pokemon.weight }}</p>
<p>{{ pokemon.height }}</p>
`;

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent, PokemonTitleCasePipe, PadStartPipe],
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
    const sample = fixture.nativeElement.querySelector('h1')?.textContent;
    const expected = pipe.transform(component.pokemon.name);
    expect(sample).toContain(`${expected}`);
  });

  it('should render pokemon id', () => {
    const pipe = new PadStartPipe();
    const sample = fixture.nativeElement.querySelectorAll('p')[0].textContent;
    const expected = pipe.transform(component.pokemon.id, 3, '0');
    expect(sample).toContain(`${expected}`);
  });

  it('should render pokemon weight', () => {
    const sample = fixture.nativeElement.querySelectorAll('p')[1].textContent;
    const expected = component.pokemon.weight;
    expect(sample).toContain(`${expected}`);
  });

  it('should render pokemon height', () => {
    const sample = fixture.nativeElement.querySelectorAll('p')[2].textContent;
    const expected = component.pokemon.height;
    expect(sample).toContain(`${expected}`);
  });
});
