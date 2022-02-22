import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  Ability,
  EvolutionChain,
  Move,
  Pokemon,
  PokemonSpecies,
  ShortPokemon,
} from 'poke-api-models';
import { combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class PokeApiService {
  readonly BASE_URL = 'https://pokeapi.co/api/v2/';
  readonly POKEMON_EXTENSION = 'pokemon/';
  readonly POKEMON_SPECIES_EXTENSION = 'pokemon-species/';
  readonly MOVE_EXTENSION = 'move/';
  readonly ABILITY_EXTENSION = 'ability/';
  readonly EVOLUTION_CHAIN_EXTENSION = 'evolution-chain/';

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

  getSpeciesByNameOrID(nameOrID: string | number): Observable<PokemonSpecies> {
    return this.http
      .get<PokemonSpecies>(
        `${this.BASE_URL}${this.POKEMON_SPECIES_EXTENSION}${nameOrID}`
      )
      .pipe(untilDestroyed(this));
  }

  getSpeciesByList(list: Array<number | string>): Observable<PokemonSpecies[]> {
    const species$ = list.map((nameOrID) =>
      this.getSpeciesByNameOrID(nameOrID)
    );
    return combineLatest(species$);
  }

  getEvolutionChainById(id: number): Observable<EvolutionChain> {
    return this.http
      .get<EvolutionChain>(
        `${this.BASE_URL}${this.EVOLUTION_CHAIN_EXTENSION}${id}`
      )
      .pipe(untilDestroyed(this));
  }

  getAbilityByNameOrID(nameOrID: number | string): Observable<Ability> {
    return this.http
      .get<Ability>(`${this.BASE_URL}${this.ABILITY_EXTENSION}${nameOrID}`)
      .pipe(untilDestroyed(this));
  }

  getAbilitiesByList(list: Array<number | string>): Observable<Ability[]> {
    const abilities$ = list.map((nameOrID) =>
      this.getAbilityByNameOrID(nameOrID)
    );
    return combineLatest(abilities$);
  }

  getMoveByNameOrID(nameOrID: string | number): Observable<Move> {
    return this.http
      .get<Move>(`${this.BASE_URL}${this.MOVE_EXTENSION}${nameOrID}`)
      .pipe(untilDestroyed(this));
  }

  getMovesByList(list: Array<number | string>): Observable<Move[]> {
    const moves$ = list.map((nameOrID) => this.getMoveByNameOrID(nameOrID));
    return combineLatest(moves$);
  }
}
