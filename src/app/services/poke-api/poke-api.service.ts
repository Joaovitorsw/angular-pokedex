import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { POKEMONS } from '@pokedex/pages';
import {
  Ability,
  EvolutionChain,
  Move,
  Pokemon,
  PokemonEvolutions,
  PokemonSpecies,
  Variety,
} from 'poke-api-models';
import { BehaviorSubject, combineLatest, defer, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
@UntilDestroy()
export class PokeAPIService {
  constructor(private http: HttpClient) {}
  readonly BASE_URL = 'https://pokeapi.co/api/v2/';
  readonly POKEMON_SPECIES_EXTENSION = 'pokemon-species/';
  readonly MOVE_EXTENSION = 'move/';
  readonly POKEMON_EXTENSION = 'pokemon/';
  readonly ABILITY_EXTENSION = 'ability/';
  readonly EVOLUTION_CHAIN_EXTENSION = 'evolution-chain/';
  request$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pokemons$$ = new BehaviorSubject<Pokemon[]>([]);
  pokemons: Pokemon[] = POKEMONS;
  pokemonForms: Pokemon[];
  pokemonMoves: Move[];

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

  getSpeciesByName(name: string): Observable<PokemonSpecies> {
    return this.http
      .get<PokemonSpecies>(
        `${this.BASE_URL}${this.POKEMON_SPECIES_EXTENSION}${name}`
      )
      .pipe(untilDestroyed(this));
  }

  getEvolutionChainById(id: number): Observable<EvolutionChain> {
    return this.http
      .get<EvolutionChain>(
        `${this.BASE_URL}${this.EVOLUTION_CHAIN_EXTENSION}${id}`
      )
      .pipe(untilDestroyed(this));
  }

  nextPokemonsRange(previous: number, next: number): Observable<Pokemon[]> {
    const pokemonsRange = this.pokemons.slice(previous - 1, next);
    return of(pokemonsRange);
  }

  searchPokemons(search: string): Observable<Pokemon[]> {
    const searchedPokemons = this.pokemons$$.value.filter((pokemon: Pokemon) =>
      pokemon.name.includes(search)
    );
    return of(searchedPokemons);
  }

  async getPokemonEvolutions(
    pokemonName: string
  ): Promise<Observable<PokemonEvolutions>> {
    this.request$$.next(true);
    const excludeNames =
      /-gmax|-mega|-alola|-galar|-y|-x |-amped |-ice |-hero|-single-strike|-standard/g;
    const pokeName = pokemonName.replace(excludeNames, '');

    let species: PokemonSpecies = await this.getSpeciesByName(
      pokeName
    ).toPromise();

    const url = species.evolution_chain.url;
    const chainPath = url.split('/')[6];
    const id = parseInt(chainPath);
    const { chain } = await this.getEvolutionChainById(id).toPromise();

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
          this.getSpeciesByName(
            pokemon.name.replace(excludeNames, '')
          ).toPromise()
        );

        const evolutionsSpecies: PokemonSpecies[] = await Promise.all(
          otherSpecies
        );
        const allSpecies = [species, ...evolutionsSpecies];
        const filteredSpecies = allSpecies.filter((element) =>
          allSpecies.indexOf(element)
        );
        const variables = await this.getPokemonVariates(filteredSpecies);
        const flavor_text_entries = species.flavor_text_entries.filter(
          (entry) => entry.language.name === 'en'
        )[0];
        flavor_text_entries.flavor_text =
          flavor_text_entries.flavor_text.replace('POKéMON', 'pokémon');
        species.flavor_text_entries = [flavor_text_entries];

        const evolution: PokemonEvolutions = {
          species: species,
          evolutions: pokemons,
          varietiesPokemon: variables,
        };
        this.request$$.next(false);

        return evolution;
      }),
      catchError(async () => {
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
        this.request$$.next(false);

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

  getPokemonAbility(id: string): Observable<Ability> {
    return this.http
      .get<Ability>(`${this.BASE_URL}${this.ABILITY_EXTENSION}${id}`)
      .pipe(untilDestroyed(this));
  }

  getPokemonMove(id: string): Observable<Move> {
    return this.http
      .get<Move>(`${this.BASE_URL}${this.MOVE_EXTENSION}${id}`)
      .pipe(untilDestroyed(this));
  }

  getPokemonAbilities(ids: string[]): Observable<Ability[]> {
    const ids$ = ids.map((id) => this.getPokemonAbility(id));
    const abilities$ = combineLatest(ids$).pipe(
      map((abilities) => {
        const formattedAbilities = abilities.map((ability) => {
          const flavor_text_entries = ability.flavor_text_entries.filter(
            (entry) => entry.language.name === 'en'
          );

          const effect_entries = ability.effect_entries.filter(
            (entry) => entry.language.name === 'en'
          );
          ability.effect_entries = effect_entries;
          ability.flavor_text_entries = [
            flavor_text_entries[flavor_text_entries.length - 1],
          ];
          return ability;
        });

        return formattedAbilities;
      }),
      catchError((error) => of(error))
    );
    return abilities$;
  }

  getMoveList(ids: string[]): Observable<Move[]> {
    const ids$ = ids.map((id) => this.getPokemonMove(id));
    const moves$ = combineLatest(ids$).pipe(
      map((moves) => {
        const formattedMoves = moves.map((move) => {
          const flavor_text_entries = move.flavor_text_entries.filter(
            (entry) => entry.language.name === 'en'
          );
          move.flavor_text_entries = [
            flavor_text_entries[flavor_text_entries.length - 1],
          ];
          this.pokemonMoves = moves;
          return move;
        });

        return formattedMoves;
      })
    );
    return moves$;
  }
}
