import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { eIndexDBKeys } from '../poke-api/poke-api.service';
import { IndexedDbService } from './indexed-db.service';

describe('IndexedDbService', () => {
  let service: IndexedDbService;
  const KEY = '2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxIndexedDBModule.forRoot(environment.dbConfig)],
    });
    service = TestBed.inject(IndexedDbService);
    service.clear(eIndexDBKeys.STORE).subscribe();
  });

  it('should return observable from store of indexDb containing data', (done) => {
    const data = { name: 'bulbasaur', test: KEY };
    const expected = 'bulbasaur';
    service.add(eIndexDBKeys.STORE, data).subscribe((key) => {
      expect(key.name).toEqual(expected);
      done();
    });
  });

  it('should return observable from store of indexDb updating data', (done) => {
    const data = { name: 'ivysaur', test: KEY };
    const expected = 'ivysaur';
    service.update(eIndexDBKeys.STORE, data).subscribe((res) => {
      expect(res[0].name).toEqual(expected);
      done();
    });
  });

  it('should return observable from store of indexDb deleting data', (done) => {
    service.delete(eIndexDBKeys.STORE, KEY).subscribe((res) => {
      expect(res.length).toEqual(0);
      done();
    });
  });

  it('should return observable from store of indexDb clearing data', (done) => {
    service.clear(eIndexDBKeys.STORE).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should return observable from store of indexDb getting all data', (done) => {
    const data = { name: 'ivysaur', test: KEY };
    service.add(eIndexDBKeys.STORE, data).subscribe((res) => {
      service.getAll(eIndexDBKeys.STORE).subscribe((res) => {
        expect(res.length).toEqual(1);
        done();
      });
    });
  });

  it('should return observable from store of indexDb getting data by key', (done) => {
    const data = { name: 'ivysaur', test: KEY };
    service.add(eIndexDBKeys.STORE, data).subscribe((res) => {
      service.getByKey(eIndexDBKeys.STORE, KEY).subscribe((res) => {
        expect(res.name).toEqual('ivysaur');
        done();
      });
    });
  });
});
