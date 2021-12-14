import { ComponentFixture, TestBed } from '@angular/core/testing';
import { pokemonsMock } from 'src/app/mocks/pokemon-mocks';
import { TypeIconPathPipe } from 'src/app/pipes/type-icon-path/type-icon-path.pipe';
import { TypeCardComponent } from './type-card.component';

describe('TypeCardComponent', () => {
  let component: TypeCardComponent;
  let fixture: ComponentFixture<TypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeCardComponent, TypeIconPathPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCardComponent);
    component = fixture.componentInstance;
    component.type = pokemonsMock[0].types[0].type.name;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render pokemon type', () => {
    const sample = fixture.nativeElement.querySelector('p').textContent;

    const expected = component.type;
    expect(sample).toContain(`${expected}`);
  });

  it('should render type image', () => {
    const pipe = new TypeIconPathPipe();
    const sample = fixture.nativeElement.querySelector('img').src;
    const expected = pipe.transform(component.type);
    expect(sample).toContain(`${expected}`);
  });
});
