import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  CachedPokemon,
  EvolutionChain,
  Pokemon,
  PokemonEvolutions,
  PokemonSpecies,
  Variety,
} from 'poke-api-models';
import { BehaviorSubject, defer, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { eIndexDBKeys } from '..';
import { IndexedDbService } from '../indexed-db/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class PokeAPIService {
  constructor(private http: HttpClient, private indexDB: IndexedDbService) {}
  readonly BASE_URL = 'https://pokeapi.co/api/v2/';
  readonly POKEMON_SPECIES_EXTENSION = 'pokemon-species/';
  readonly POKEMON_EXTENSION = 'pokemon/';
  readonly EVOLUTION_CHAIN_EXTENSION = 'evolution-chain/';
  request$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pokemons$$ = new BehaviorSubject<Pokemon[]>([]);
  pokemons: Pokemon[];
  requestProgress: number = 0.5;
  hasEvolution: boolean;

  getPokemonByNameOrID(name: string | number): Observable<Pokemon> {
    return this.http
      .get<Pokemon>(`${this.BASE_URL}${this.POKEMON_EXTENSION}${name}`)
      .pipe(untilDestroyed(this));
  }

  getPokemonsByList(
    pokemonsList: Array<string | number>
  ): Observable<Pokemon[]> {
    const pokemonsPromiseList = pokemonsList.map((pokemon: string | number) => {
      return this.http
        .get<Pokemon>(`${this.BASE_URL}${this.POKEMON_EXTENSION}${pokemon}`)

        .toPromise();
    });
    return defer(async () => Promise.all(pokemonsPromiseList)).pipe(
      untilDestroyed(this)
    );
  }

  getPokemonsByCustomRange(...args: Array<number>): Observable<Pokemon[]> {
    const [start, end] = args;
    const myRange = Array.from({ length: end }, (_, i) => i + start);

    return this.getPokemonsByList(myRange);
  }

  getSpeciesByName(name: string): Promise<PokemonSpecies> {
    return this.http
      .get<PokemonSpecies>(
        `${this.BASE_URL}${this.POKEMON_SPECIES_EXTENSION}${name}`
      )
      .pipe(untilDestroyed(this))
      .toPromise();
  }

  getEvolutionChainById(id: number): Promise<EvolutionChain> {
    return this.http
      .get<EvolutionChain>(
        `${this.BASE_URL}${this.EVOLUTION_CHAIN_EXTENSION}${id}`
      )
      .pipe(untilDestroyed(this))
      .toPromise();
  }

  nextPokemonsRange(previous: number, next: number): Observable<Pokemon[]> {
    return this.getCachedPokemonsByRange(previous, next).pipe(
      untilDestroyed(this),
      catchError(() => this.addPokemonsRangeInCache())
    );
  }

  addPokemonsRangeInCache(): Observable<Pokemon[]> {
    return this.getPokemonsByCustomRange(1, 898).pipe(
      untilDestroyed(this),
      tap((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.indexDB
          .update(eIndexDBKeys.POKEMONS, {
            pokemon: pokemons,
            id: eIndexDBKeys.POKEMONS,
          })
          .subscribe();
      })
    );
  }

  getCachedPokemonsByRange(
    previous: number,
    next: number
  ): Observable<Pokemon[]> {
    const arrayLength = next + 1 - previous;
    const myRange = Array.from(
      { length: arrayLength },
      (_, index) => index + previous
    );

    if (this.pokemons?.length >= 898) {
      this.request$$.next(true);
      const pokemons = this.pokemons.filter((pokemon: Pokemon) =>
        myRange.includes(pokemon.id)
      );

      return of(pokemons).pipe(untilDestroyed(this));
    }

    return this.indexDB.getAll(eIndexDBKeys.POKEMONS).pipe(
      map((data: CachedPokemon[]) => {
        const noPokemons = data[0].pokemon.length === 0;

        if (noPokemons) throw new Error('No Pokemons');

        const pokemons = data[0].pokemon;

        this.request$$.next(true);

        return pokemons.filter((pokemon: Pokemon) =>
          myRange.includes(pokemon.id)
        );
      })
    );
  }

  searchPokemons(search: string): Observable<Pokemon[]> {
    return this.getCachedPokemonsByRange(0, 898).pipe(
      untilDestroyed(this),
      map((pokemons: Pokemon[]) => {
        return pokemons.filter((pokemon: Pokemon) =>
          pokemon.name.includes(search)
        );
      })
    );
  }

  async getPokemonEvolutions(
    pokemonName: string
  ): Promise<Observable<PokemonEvolutions>> {
    this.request$$.next(false);
    const excludeNames =
      /-gmax|-mega|-alola|-galar|-y|-x |-amped |-ice |-hero|-single-strike|-standard/g;
    const pokeName = pokemonName.replace(excludeNames, '');

    let species: PokemonSpecies = await this.getSpeciesByName(pokeName);

    const url = species.evolution_chain.url;
    const chainPath = url.split('/')[6];
    const id = parseInt(chainPath);
    const { chain } = await this.getEvolutionChainById(id);

    let forms: Array<string | number> = chain.evolves_to.map(
      (pokemon) => pokemon.species.name
    );

    if (chain.evolves_to.length === 0) {
      forms = [chain.species.name];
    }
    const hasEvolutions = chain.evolves_to.length === 1;

    if (hasEvolutions) {
      const firstForm = chain.species.url.split('/')[6];
      const secondForm = chain.evolves_to[0]?.species.url.split('/')[6];
      const thirdForm =
        chain.evolves_to[0]?.evolves_to[0]?.species.url.split('/')[6];
      forms = [firstForm, secondForm, thirdForm].filter((form) => form);
    }

    const evolutions$ = this.getPokemonsByList(forms).pipe(
      untilDestroyed(this),
      switchMap(async (pokemons) => {
        const otherSpecies = pokemons.map((pokemon) =>
          this.getSpeciesByName(pokemon.name.replace(excludeNames, ''))
        );

        const evolutionsSpecies: PokemonSpecies[] = await Promise.all(
          otherSpecies
        );
        const allSpecies = [species, ...evolutionsSpecies];
        const filteredSpecies = allSpecies.filter((element) =>
          allSpecies.indexOf(element)
        );
        const variables = await this.getPokemonVariates(filteredSpecies);

        const evolution: PokemonEvolutions = {
          species: species,
          evolutions: pokemons,
          varietiesPokemon: variables,
        };

        this.request$$.next(true);

        return evolution;
      }),
      catchError(async () => {
        this.request$$.next(true);

        const evolution = await this.getPokemonVariates([species]).then(
          (variates) => {
            const evolution: PokemonEvolutions = {
              species: species,
              evolutions: [],
              varietiesPokemon: variates,
            };

            return evolution;
          }
        );

        return evolution;
      })
    );

    return evolutions$;
  }

  async getPokemonVariates(allSpecies: PokemonSpecies[]): Promise<Pokemon[]> {
    const variatesPokemons: Variety[] = allSpecies.flatMap(
      (species: PokemonSpecies) => {
        const variantesPredicate = (varieties: Variety) => {
          const hasAlola =
            varieties.pokemon.name.includes(`${species.name}-alola`) &&
            !varieties.pokemon.name.includes('cap');

          const miscellanies =
            !varieties.is_default &&
            !varieties.pokemon.name.includes('cap') &&
            !varieties.pokemon.name.includes('rock-star') &&
            !varieties.pokemon.name.includes('pop-star') &&
            !varieties.pokemon.name.includes('totem') &&
            !varieties.pokemon.name.includes('belle') &&
            !varieties.pokemon.name.includes('libre') &&
            !varieties.pokemon.name.includes('cosplay') &&
            !varieties.pokemon.name.includes('phd');

          return miscellanies || hasAlola;
        };

        const hasVariantes: Variety[] =
          species.varieties.filter(variantesPredicate);

        return hasVariantes;
      }
    );

    const listVariantes: Array<string> = variatesPokemons.map(
      (variant: Variety) => variant.pokemon.name
    );

    const variables: Pokemon[] = await this.getPokemonsByList(
      listVariantes
    ).toPromise();

    return variables;
  }
}
