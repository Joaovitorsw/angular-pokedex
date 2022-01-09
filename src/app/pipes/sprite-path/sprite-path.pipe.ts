import { Pipe, PipeTransform } from '@angular/core';
import {
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from '@pokedex/services';
import PokeAPI from 'pokedex-promise-v2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Pipe({
  name: 'spritePath',
})
export class SpritePathPipe implements PipeTransform {
  constructor(private readonly spriteStorage: SpriteStorageService) {}
  transform({ name, sprites }: PokeAPI.Pokemon): Observable<string> {
    return this.spriteStorage.getSpritePathByName(name).pipe(
      map((spritePath) => {
        const NOT_FOUND = spritePath === SpriteStorageErrorMessage.NOT_FOUND;
        if (!NOT_FOUND) return spritePath;

        const spriteVersionUrl =
          (sprites.versions['generation-vi']['omegaruby-alphasapphire']
            .front_default as string) ?? (sprites.front_default as string);

        return spriteVersionUrl;
      })
    );
  }
}
