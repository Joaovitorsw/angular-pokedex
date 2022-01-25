import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { POKEMONS_NAMES } from 'app/mocks/pokemon-names.mock';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { eIndexDBKeys, IndexedDbService } from '../indexed-db';

export const enum SpriteStorageErrorCode {
  NOT_FOUND = '404',
}
export const enum SpriteStorageErrorMessage {
  NOT_FOUND = 'Not Found.',
}

interface SpriteData {
  id: string | number;
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class SpriteStorageService {
  constructor(
    private readonly http: HttpClient,
    private indexDB: IndexedDbService
  ) {
    this.getAllSprites().subscribe((sprites) => {
      this.GIFS = sprites;
    });
  }
  readonly BASE_URL =
    'https://raw.githubusercontent.com/Joaovitorsw/poke-gifs/main/normal/';
  readonly EXTENSION = '.gif';
  private GIFS: Array<string>;

  async createCache() {
    const GIFS = POKEMONS_NAMES.map((name) => {
      const url = `${this.BASE_URL}${name}${this.EXTENSION}`;

      return this.getPokemonImage(url)
        .toPromise()
        .catch(() => {
          return SpriteStorageErrorCode.NOT_FOUND;
        });
    });

    const GIFS_DATA = await Promise.all(GIFS);
    const SPRITES: SpriteData = {
      id: eIndexDBKeys.SPRITE_PATH,
      data: GIFS_DATA,
    };
    this.indexDB.update(eIndexDBKeys.SPRITE_PATH, SPRITES).subscribe();

    return SPRITES;
  }

  getAllSprites(): Observable<Array<string>> {
    return this.indexDB
      .getByKey(eIndexDBKeys.SPRITE_PATH, eIndexDBKeys.SPRITE_PATH)
      .pipe(
        switchMap(async (sprites) => {
          if (!sprites) {
            const sprites = await this.createCache();
            return sprites.data;
          }
          return sprites.data;
        })
      );
  }

  getSpritePathByName(name: string): Observable<string> {
    const id = POKEMONS_NAMES.findIndex((pokemonName) => pokemonName === name);
    const noServiceCache = !this.GIFS || !this.GIFS[id];
    if (noServiceCache)
      return this.getPokemonImage(`${this.BASE_URL}${name}${this.EXTENSION}`);

    return of(this.GIFS[id]);
  }
  getPokemonImage(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      untilDestroyed(this),
      switchMap((blob) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        return new Observable<string>((observer) => {
          fileReader.onload = () => {
            observer.next(fileReader.result as string);
            observer.complete();
          };
        });
      }),
      catchError(() => {
        return of(SpriteStorageErrorMessage.NOT_FOUND);
      })
    );
  }
}
