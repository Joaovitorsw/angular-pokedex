import { Pipe, PipeTransform } from '@angular/core';
import {
  eIndexDBKeys,
  IndexedDbService,
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from '@pokedex/services';
import { Pokemon } from 'poke-api-models';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
@Pipe({
  name: 'spritePath',
})
export class SpritePathPipe implements PipeTransform {
  constructor(
    private readonly spriteStorage: SpriteStorageService,
    private indexDB: IndexedDbService
  ) {}
  private cache: string;
  transform({ name, sprites, id }: Pokemon): Observable<string> {
    if (this.cache) return of(this.cache);
    return this.indexDB.getByKey(eIndexDBKeys.SPRITE_PATH, id).pipe(
      switchMap((image) => {
        if (image?.id === id) return of(image.spritePath);
        return this.spriteStorage.getSpritePathByName(name).pipe(
          map((spritePath) => {
            const NOT_FOUND =
              spritePath === SpriteStorageErrorMessage.NOT_FOUND;
            if (!NOT_FOUND) return spritePath;

            const spriteVersionUrl =
              (sprites.versions['generation-vi']['omegaruby-alphasapphire']
                .front_default as string) ?? (sprites.front_default as string);

            return spriteVersionUrl;
          }),
          tap((spritePath) => {
            this.cache = spritePath;
            this.indexDB
              .add(eIndexDBKeys.SPRITE_PATH, {
                id: id,
                spritePath,
              })
              .subscribe();
          })
        );
      })
    );
  }
}
