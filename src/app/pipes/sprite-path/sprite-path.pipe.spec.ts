import {
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from '@pokedex/services';
import PokeAPI from 'poke-api-models';
import { of } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';
import { SpritePathPipe } from './sprite-path.pipe';

const spriteStorageMock = mock(SpriteStorageService);
const spriteStorageMockInstance = instance(spriteStorageMock);
const PIPE = new SpritePathPipe(spriteStorageMockInstance);

describe('SpritePathPipe', () => {
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

    const result = PIPE.transform(samplePokemon as unknown as PokeAPI.Pokemon);

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

    const result = PIPE.transform(samplePokemon as unknown as PokeAPI.Pokemon);

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

    const result = PIPE.transform(samplePokemon as unknown as PokeAPI.Pokemon);

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

    const result = PIPE.transform(samplePokemon as unknown as PokeAPI.Pokemon);

    result.subscribe((spritePath) => {
      expect(spritePath).toBe(expectedSprite);
      done();
    });
  });
});
