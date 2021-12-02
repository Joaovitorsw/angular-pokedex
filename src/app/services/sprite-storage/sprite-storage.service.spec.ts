import { FirebaseApp } from '@angular/fire/app';
import { instance, mock } from 'ts-mockito';
import { SpriteStorageService } from './sprite-storage.service';

describe('SpriteStorageService', () => {
  let service: SpriteStorageService;
  let firebaseAppMock: FirebaseApp;
  beforeEach(() => {
    firebaseAppMock = mock(FirebaseApp);
    const spriteStorageMockInstance = instance(firebaseAppMock);
    service = new SpriteStorageService(spriteStorageMockInstance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
