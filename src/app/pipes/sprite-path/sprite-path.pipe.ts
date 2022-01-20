import { Pipe, PipeTransform } from '@angular/core';
import {
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from '@pokedex/services';
import PokeAPI from 'poke-api-models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Pipe({
  name: 'spritePath',
})
export class SpritePathPipe implements PipeTransform {
  constructor(private readonly spriteStorage: SpriteStorageService) {}
  private cache: string;
  transform({ name, sprites }: PokeAPI.Pokemon): Observable<string> {
    if (this.cache) return of(this.cache);

    return this.spriteStorage.getSpritePathByName(name).pipe(
      map((spritePath) => {
        const NOT_FOUND = spritePath === SpriteStorageErrorMessage.NOT_FOUND;
        this.cache = spritePath;
        if (!NOT_FOUND) return spritePath;

        const spriteVersionUrl =
          (sprites.versions['generation-vi']['omegaruby-alphasapphire']
            .front_default as string) ?? (sprites.front_default as string);

        return spriteVersionUrl;
      })
    );
  }
}
