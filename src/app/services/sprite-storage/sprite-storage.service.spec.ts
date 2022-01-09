import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from './sprite-storage.service';

describe('SpriteStorageService', () => {
  let service: SpriteStorageService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpriteStorageService],
    });
    service = TestBed.inject(SpriteStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return a sprite path', (done) => {
    const spriteName = 'bulbasaur';
    const spritePath = `${service.BASE_URL}${spriteName}${service.EXTENSION}`;
    service.getSpritePathByName(spriteName).subscribe((path) => {
      expect(path).toBe(spritePath);
      done();
    });
    const req = httpMock.expectOne(spritePath);
    expect(req.request.method).toEqual('GET');
    const response = new Blob([], { type: 'image/gif' });

    req.flush(response);
  });

  it('should return not found when there is no image ', (done) => {
    const spriteName = 'bulbasaur';
    const spritePath = `${service.BASE_URL}${spriteName}${service.EXTENSION}`;
    service.getSpritePathByName(spriteName).subscribe((error) => {
      expect(error).toBe(SpriteStorageErrorMessage.NOT_FOUND);
      done();
    });
    const req = httpMock.expectOne(spritePath);
    expect(req.request.method).toEqual('GET');
    const response = new Blob();

    req.flush(response, { status: 404, statusText: 'Not Found' });
  });
});
