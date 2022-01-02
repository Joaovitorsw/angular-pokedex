import { Injectable } from '@angular/core';
import PokeAPI, { Pokemon, PokemonSpecies } from 'pokedex-promise-v2';
import { BehaviorSubject, defer, Observable, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IndexedDbService } from '../indexed-db/indexed-db.service';

export interface PokemonEvolutions {
  species: PokemonSpecies;
  evolutions: Pokemon[];
  variatesPokemons: Pokemon[];
}

export enum eIndexDBKeys {
  STORE = 'cached-pokemons',
  START = '1',
  CACHE = '2',
}

@Injectable({
  providedIn: 'root',
})
export class PokeAPIService {
  constructor(private PokeAPI: PokeAPI, private indexDB: IndexedDbService) {}

  request$$: Subject<boolean> = new Subject();
  pokemons$$: BehaviorSubject<PokeAPI.Pokemon[]>;
  pokemons: PokeAPI.Pokemon[];
  hasEvolution: boolean;

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

  getPokemonsByRange(...args: Array<number>): Observable<PokeAPI.Pokemon[]> {
    const [start, end] = args;
    const myRange = Array.from({ length: end }, (_, i) => i + start);

    return defer(
      async () =>
        (await this.PokeAPI.getPokemonByName(myRange)) as PokeAPI.Pokemon[]
    );
  }

  async getPokemonEvolutions(
    pokemonName: string
  ): Promise<Observable<PokemonEvolutions>> {
    this.request$$.next(false);

    const pokeName = pokemonName.replace(/-mega/g, '').replace(/-alola/g, '');

    const species: PokeAPI.PokemonSpecies = await this.getSpeciesByName(
      pokeName
    );
    const url = species.evolution_chain.url;
    const chainPath = url.split('/')[6];
    const id = parseInt(chainPath);
    const { chain } = await this.getEvolutionChainById(id);

    let forms: Array<string> = chain.evolves_to.map(
      (species) => species.species.name
    );

    if (chain.evolves_to.length === 1) {
      const firstForm = chain.species.name;
      const secondForm = chain.evolves_to[0]?.species.name;
      const thirdForm = chain.evolves_to[0]?.evolves_to[0]?.species.name;
      forms = [firstForm, secondForm, thirdForm].filter((form) => form);
    }
    const evolutions$ = this.getPokemonsByList(forms).pipe(
      switchMap(async (pokemons) => {
        const otherSpecies = pokemons.map((pokemon) =>
          this.getSpeciesByName(pokemon.name)
        );

        const allSpecies: PokeAPI.PokemonSpecies[] = await Promise.all(
          otherSpecies
        );

        const variatesPokemons: PokeAPI.Variety[] = allSpecies.flatMap(
          (species: PokeAPI.PokemonSpecies) => {
            const variantesPredicate = (varieties: PokeAPI.Variety) => {
              const hasMega = varieties.pokemon.name.includes('mega');
              const hasAlola =
                varieties.pokemon.name.includes(`${species.name}-alola`) &&
                !varieties.pokemon.name.includes('cap');
              return (
                (!varieties.is_default && hasMega) ||
                (!varieties.is_default && hasAlola)
              );
            };

            const hasVariantes: PokeAPI.Variety[] =
              species.varieties.filter(variantesPredicate);
            return hasVariantes;
          }
        );
        const listVariantes: Array<string> = variatesPokemons.map(
          (variant: PokeAPI.Variety) => variant.pokemon.name
        );

        const variables: Pokemon[] = await this.getPokemonsByList(
          listVariantes
        ).toPromise();

        const evolution: PokemonEvolutions = {
          species: species,
          evolutions: pokemons,
          variatesPokemons: variables,
        };

        this.request$$.next(true);

        return evolution;
      }),
      catchError(() => {
        this.request$$.next(true);
        return [];
      })
    );
    return evolutions$;
  }

  getPokemonsFirstRange() {
    this.request$$.next(false);
    this.indexDB
      .getByKey(eIndexDBKeys.STORE, eIndexDBKeys.START)
      .subscribe((data) => {
        if (data?.id === 1) {
          this.pokemons = data.pokemons;
          this.pokemons$$ = new BehaviorSubject<PokeAPI.Pokemon[]>(
            data.pokemons
          );
          this.request$$.next(true);
          return;
        }
        this.getPokemonsByRange(1, 24).subscribe(
          (pokemons: PokeAPI.Pokemon[]) => {
            this.indexDB.add(eIndexDBKeys.STORE, {
              pokemons: pokemons,
              id: eIndexDBKeys.START,
            });
            this.request$$.next(true);
            this.pokemons$$ = new BehaviorSubject<PokeAPI.Pokemon[]>(pokemons);
          }
        );
      });
  }

  nextPokemonsRange(previous: number, next: number): void {
    this.request$$.next(false);

    if (previous + next >= 898) next = 899 - previous;

    this.indexDB
      .getByKey(eIndexDBKeys.STORE, eIndexDBKeys.CACHE)
      .subscribe((data) => {
        const pokemonsLength = data?.pokemons.length;
        const hasCache = pokemonsLength - this.pokemons$$.value.length > 0;
        const nextCache = previous + next - 1;

        if (hasCache && pokemonsLength >= nextCache) {
          this.pokemons = data.pokemons;
          const previousPokemons = this.pokemons$$.value;
          const pokes = data.pokemons.slice(previous - 1, nextCache);
          const nextPokemons = [...previousPokemons, ...pokes];
          this.request$$.next(true);
          this.pokemons$$.next(nextPokemons);
          return;
        }

        this.getPokemonsByRange(previous, next).subscribe(
          (pokemons: PokeAPI.Pokemon[]) => {
            const previousPokemons = this.pokemons$$.value;
            const nextPokemons = [...previousPokemons, ...pokemons];
            this.request$$.next(true);
            this.indexDB.update(eIndexDBKeys.STORE, {
              pokemons: nextPokemons,
              id: eIndexDBKeys.CACHE,
            });
            this.pokemons$$.next(nextPokemons);
          }
        );
      });
  }

  getSpeciesByName(name: string): Promise<PokeAPI.PokemonSpecies> {
    return this.PokeAPI.getPokemonSpeciesByName(
      name
    ) as Promise<PokeAPI.PokemonSpecies>;
  }

  getEvolutionChainById(id: number): Promise<PokeAPI.EvolutionChain> {
    return this.PokeAPI.getEvolutionChainById(
      id
    ) as Promise<PokeAPI.EvolutionChain>;
  }
}
