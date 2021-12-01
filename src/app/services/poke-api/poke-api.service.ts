import { Injectable } from '@angular/core';
import PokeAPI from 'pokedex-promise-v2';
import { defer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  PokeAPI;
  constructor() {
    this.PokeAPI = new PokeAPI();
  }
  getAllPokemonsDetails() {}
  getPokemonByNameOrID(name: string | number): Observable<PokeAPI.Pokemon> {
    return defer(
      () => this.PokeAPI.getPokemonByName(name) as Promise<PokeAPI.Pokemon>
    );
  }
  getPokemonsByList(
    list: Array<string | number>
  ): Observable<PokeAPI.Pokemon[]> {
    return defer(
      () => this.PokeAPI.getPokemonByName(list) as Promise<PokeAPI.Pokemon[]>
    );
  }
}
