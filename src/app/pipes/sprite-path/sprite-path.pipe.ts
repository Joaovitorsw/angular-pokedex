import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import PokeAPI from 'pokedex-promise-v2';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Pipe({
  name: 'spritePath',
})
export class SpritePathPipe implements PipeTransform {
  constructor(private readonly httpClient: HttpClient) {}
  transform({ name, sprites }: PokeAPI.Pokemon): Observable<string> {
    const gif = `../../../assets/gifs/normal/${name}.gif`;
    const spriteVersionUrl =
      (sprites.versions['generation-vi']['omegaruby-alphasapphire']
        .front_default as string) ?? (sprites.front_default as string);

    return this.httpClient.get(gif, { responseType: 'blob' }).pipe(
      map(() => gif),
      catchError(() => of(spriteVersionUrl))
    );
  }
}
