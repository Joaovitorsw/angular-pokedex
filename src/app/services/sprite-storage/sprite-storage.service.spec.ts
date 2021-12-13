import { FirebaseApp } from '@angular/fire/app';
import { of } from 'rxjs';
import { instance, mock } from 'ts-mockito';
import {
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from './sprite-storage.service';

describe('SpriteStorageService', () => {
  let service: SpriteStorageService;
  let firebase: FirebaseApp;
  beforeEach(() => {
    const firebaseApp = mock(FirebaseApp);
    firebase = instance(firebaseApp);
    service = new SpriteStorageService(firebaseApp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return the observable with gif path', (done) => {
    const sample = 'bulbasaur';
    const expected = 'bulbasaur.gif';
    spyOn(service, 'getSpritePathByName').and.returnValue(of(expected));
    service.getSpritePathByName(sample).subscribe((result) => {
      expect(result).toBe(expected);
      done();
    });
  });

  it('should be return the observable with quota exceeded', (done) => {
    const sample = 'bulbasaur';
    const expected = SpriteStorageErrorMessage.QUOTA_EXCEEDED;
    spyOn(service, 'getSpritePathByName').and.returnValue(of(expected));
    service.getSpritePathByName(sample).subscribe((result) => {
      expect(result).toBe(expected);
      done();
    });
  });

  it('should be return the observable with not found path ', (done) => {
    const sample = 'bulbasaur';
    const expected = SpriteStorageErrorMessage.NOT_FOUND;
    spyOn(service, 'getSpritePathByName').and.returnValue(of(expected));
    service.getSpritePathByName(sample).subscribe((result) => {
      expect(result).toBe(expected);
      done();
    });
  });
});
