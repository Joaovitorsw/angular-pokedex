import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import PokeAPI from 'pokedex-promise-v2';
import { IndexedDbService } from 'src/app/services/indexed-db/indexed-db.service';
import { PokeAPIService } from 'src/app/services/poke-api/poke-api.service';
import { environment } from 'src/environments/environment';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        NgxIndexedDBModule.forRoot(environment.dbConfig),
        RouterTestingModule,
      ],
      providers: [
        PokeAPIService,
        IndexedDbService,
        { provide: PokeAPI, useValue: new PokeAPI() },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
