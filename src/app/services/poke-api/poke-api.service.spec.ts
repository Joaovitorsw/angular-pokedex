import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { PokeAPIService } from './poke-api.service';

describe('PokeAPIService', () => {
  let service: PokeAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxIndexedDBModule.forRoot(environment.dbConfig),
      ],
    });
    service = TestBed.inject(PokeAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return a pokemon by name or id', (done) => {});
});
