import PokeAPI from 'pokedex-promise-v2';
import { of } from 'rxjs';
import {
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from 'src/app/services/sprite-storage/sprite-storage.service';
import { instance, mock, when } from 'ts-mockito';
import { SpritePathPipe } from './sprite-path.pipe';

describe('SpritePathPipe', () => {
  let pipe: SpritePathPipe;
  let spriteStorageMock: SpriteStorageService;

  beforeEach(() => {
    spriteStorageMock = mock(SpriteStorageService);
    const spriteStorageMockInstance = instance(spriteStorageMock);
    pipe = new SpritePathPipe(spriteStorageMockInstance);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the gif path when exists on storage', (done) => {
    when(spriteStorageMock.getSpritePathByName('bulbasaur')).thenReturn(
      of('bulbasaur.gif')
    );
    const samplePokemon = {
      name: 'bulbasaur',
      sprites: {
        front_default: 'bulbasaur.png',
        versions: {
          'generation-vi': {
            'omegaruby-alphasapphire': { front_default: 'bulbasaur-vi.png' },
          },
        },
      },
    };

    const expectedSprite = 'bulbasaur.gif';

    const result = pipe.transform(samplePokemon as unknown as PokeAPI.Pokemon);

    result.subscribe((spritePath) => {
      expect(spritePath).toBe(expectedSprite);
      done();
    });
  });

  it('should return the generation-vi path when storage return not founded', (done) => {
    when(spriteStorageMock.getSpritePathByName('bulbasaur')).thenReturn(
      of(SpriteStorageErrorMessage.NOT_FOUND)
    );

    const samplePokemon = {
      name: 'bulbasaur',
      sprites: {
        front_default: 'bulbasaur.png',
        versions: {
          'generation-vi': {
            'omegaruby-alphasapphire': { front_default: 'bulbasaur-vi.png' },
          },
        },
      },
    };

    const expectedSprite = 'bulbasaur-vi.png';

    const result = pipe.transform(samplePokemon as unknown as PokeAPI.Pokemon);

    result.subscribe((spritePath) => {
      expect(spritePath).toBe(expectedSprite);
      done();
    });
  });

  it('should return the front_default path when generation-vi does no exist and storage return not found', (done) => {
    when(spriteStorageMock.getSpritePathByName('bulbasaur')).thenReturn(
      of(SpriteStorageErrorMessage.NOT_FOUND)
    );

    const samplePokemon = {
      name: 'bulbasaur',
      sprites: {
        front_default: 'bulbasaur.png',
        versions: {
          'generation-vi': {
            'omegaruby-alphasapphire': { front_default: null },
          },
        },
      },
    };

    const expectedSprite = 'bulbasaur.png';

    const result = pipe.transform(samplePokemon as unknown as PokeAPI.Pokemon);

    result.subscribe((spritePath) => {
      expect(spritePath).toBe(expectedSprite);
      done();
    });
  });

  it('should return the gif path ', (done) => {
    when(spriteStorageMock.getSpritePathByName('bulbasaur')).thenReturn(
      of('bulbasaur.gif')
    );

    const samplePokemon = {
      name: 'bulbasaur',
    };

    const expectedSprite = 'bulbasaur.gif';

    const result = pipe.transform(samplePokemon as unknown as PokeAPI.Pokemon);

    result.subscribe((spritePath) => {
      expect(spritePath).toBe(expectedSprite);
      done();
    });
  });
});
