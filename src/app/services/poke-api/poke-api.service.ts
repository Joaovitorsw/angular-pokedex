import { Injectable } from '@angular/core';
import PokeAPI from 'pokedex-promise-v2';
import { defer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  constructor(private PokeAPI: PokeAPI) {}
  getAllPokemonsDetails() {}
  getPokemonByNameOrID(name: string | number): Observable<PokeAPI.Pokemon> {
    return defer(
      async () => (await this.PokeAPI.getPokemonByName(name)) as PokeAPI.Pokemon
    );
  }
  getPokemonsByList(
    list: Array<string | number>
  ): Observable<PokeAPI.Pokemon[]> {
    return defer(
      async () =>
        (await this.PokeAPI.getPokemonByName(list)) as PokeAPI.Pokemon[]
    );
  }
}
