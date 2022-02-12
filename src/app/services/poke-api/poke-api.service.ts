import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Pokemon, ShortPokemon } from 'poke-api-models';
import { combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class PokeApiService {
  readonly BASE_URL = 'https://pokeapi.co/api/v2/';
  readonly POKEMON_EXTENSION = 'pokemon/';
  simplifiedPokemons: ShortPokemon[];
  constructor(private http: HttpClient) {}

  getPokemonByNameOrID(nameOrID: string | number): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(this.BASE_URL + this.POKEMON_EXTENSION + nameOrID)
      .pipe(untilDestroyed(this));
  }

  getPokemonsByList(list: Array<number | string>): Observable<Pokemon[]> {
    const pokemons$ = list.map((nameOrID) =>
      this.getPokemonByNameOrID(nameOrID)
    );
    return combineLatest(pokemons$);
  }
}
