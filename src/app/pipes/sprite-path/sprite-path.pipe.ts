import { Pipe, PipeTransform } from '@angular/core';
import PokeAPI from 'pokedex-promise-v2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  SpriteStorageErrorMessage,
  SpriteStorageService,
} from 'src/app/services/sprite-storage/sprite-storage.service';
@Pipe({
  name: 'spritePath',
})
export class SpritePathPipe implements PipeTransform {
  constructor(private readonly spriteStorage: SpriteStorageService) {}
  transform({ name, sprites }: PokeAPI.Pokemon): Observable<string> {
    return this.spriteStorage.getSpritePathByName(name).pipe(
      map((spritePath) => {
        const hasError = spritePath === SpriteStorageErrorMessage.NOT_FOUND;

        if (!hasError) return spritePath;

        const spriteVersionUrl =
          (sprites.versions['generation-vi']['omegaruby-alphasapphire']
            .front_default as string) ?? (sprites.front_default as string);
        console.log(spritePath);
        console.log(spriteVersionUrl);

        return spriteVersionUrl;
      })
    );
  }
}