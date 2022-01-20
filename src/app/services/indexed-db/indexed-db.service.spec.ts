import { TestBed } from '@angular/core/testing';
import { eIndexDBKeys } from '@pokedex/services';
import { environment } from 'environments/environment';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { IndexedDbService } from './indexed-db.service';

describe('IndexedDbService', () => {
  let service: IndexedDbService;
  const KEY = '2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxIndexedDBModule.forRoot(environment.dbConfig)],
    });
    service = TestBed.inject(IndexedDbService);
    service.clear(eIndexDBKeys.POKEMONS).subscribe();
  });

  it('should return observable from store of indexDb containing data', (done) => {
    const data = { name: 'bulbasaur', id: KEY };
    const expected = 'bulbasaur';
    service.add(eIndexDBKeys.POKEMONS, data).subscribe((key) => {
      expect(key.name).toEqual(expected);
      done();
    });
  });

  it('should return observable from store of indexDb updating data', (done) => {
    const data = { name: 'ivysaur', id: KEY };
    const expected = 'ivysaur';
    service.update(eIndexDBKeys.POKEMONS, data).subscribe((res) => {
      expect(res[0].name).toEqual(expected);
      done();
    });
  });

  it('should return observable from store of indexDb deleting data', (done) => {
    service.delete(eIndexDBKeys.POKEMONS, KEY).subscribe((res) => {
      expect(res.length).toEqual(0);
      done();
    });
  });

  it('should return observable from store of indexDb clearing data', (done) => {
    service.clear(eIndexDBKeys.POKEMONS).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should return observable from store of indexDb getting all data', (done) => {
    const data = { name: 'ivysaur', id: KEY };
    service.add(eIndexDBKeys.POKEMONS, data).subscribe((res) => {
      service.getAll(eIndexDBKeys.POKEMONS).subscribe((res) => {
        expect(res.length).toEqual(1);
        done();
      });
    });
  });

  it('should return observable from store of indexDb getting data by key', (done) => {
    const data = { name: 'ivysaur', id: KEY };
    service.add(eIndexDBKeys.POKEMONS, data).subscribe((res) => {
      service.getByKey(eIndexDBKeys.POKEMONS, KEY).subscribe((res) => {
        expect(res.name).toEqual('ivysaur');
        done();
      });
    });
  });
});
