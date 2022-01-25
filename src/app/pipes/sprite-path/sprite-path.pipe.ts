import { Pipe, PipeTransform } from '@angular/core';
import {
  eIndexDBKeys,
  IndexedDbService,
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from '@pokedex/services';
import { Pokemon } from 'poke-api-models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
@Pipe({
  name: 'spritePath',
})
export class SpritePathPipe implements PipeTransform {
  constructor(
    private readonly spriteStorage: SpriteStorageService,
    private indexDB: IndexedDbService
  ) {}
  private cache = new BehaviorSubject('');
  private id: string;
  transform({ name, sprites, id }: Pokemon): Observable<string> {
    return this.indexDB.getByKey(eIndexDBKeys.SPRITE_PATH, id).pipe(
      switchMap((image) => {
        if (image?.id === id) {
          return of(image.spritePath);
        }
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
            this.cache.next(spritePath);
            this.indexDB
              .update(eIndexDBKeys.SPRITE_PATH, {
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
