import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import PokeAPI from 'pokedex-promise-v2';
import { AboutPage } from './about.page';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutPage],
      imports: [RouterTestingModule],
      providers: [{ provide: PokeAPI, useValue: new PokeAPI() }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
