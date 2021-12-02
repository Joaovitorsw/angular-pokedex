import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { pokemonsMock } from 'src/app/mocks/pokemon-mocks';
import { SpritePathPipe } from './sprite-path.pipe';

describe('SpritePathPipe', () => {
  let pipe: SpritePathPipe;
  let httpClient: HttpClient;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    httpClient = TestBed.inject(HttpClient);
    pipe = new SpritePathPipe(httpClient);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return the correct sprite path to venusaur-mega', (done) => {
    expect(
      pipe.transform(pokemonsMock[0]).subscribe((path) => {
        expect(path).toBe('../../../assets/gifs/normal/venusaur-mega.gif');
        done();
      })
    );
  });

  it('should return the correct sprite path to charizard-mega-x', (done) => {
    expect(
      pipe.transform(pokemonsMock[1]).subscribe((path) => {
        expect(path).toBe('../../../assets/gifs/normal/charizard-mega-x.gif');
        done();
      })
    );
  });
});
