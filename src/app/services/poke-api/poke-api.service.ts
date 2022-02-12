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
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
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
  readonly EXCLUDED_NAMES =
    /-gmax|-mega|-alola|-galar|-y|-x |-amped |-ice |-hero|-single-strike|-standard|-altered/g;
  request$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pokemons$$ = new BehaviorSubject<Pokemon[]>([]);
  pokemons: Pokemon[] = POKEMONS;
  pokemonForms: Pokemon[];
  pokemonMoves: Move[];

  getPokemonByNameOrID(name: string | number): Observable<Pokemon> {
    if (name === 'giratina') name = 'giratina-altered';

    return this.http
      .get<Pokemon>(`${this.BASE_URL}${this.POKEMON_EXTENSION}${name}`)
      .pipe(untilDestroyed(this));
  }

  getPokemonsByList(
    pokemonsList: Array<string | number>
  ): Observable<Pokemon[]> {
    const pokemons$ = pokemonsList.map((pokemon: string | number) => {
      if (pokemon === 'giratina') pokemon = 'giratina-altered';

      return this.http
        .get<Pokemon>(`${this.BASE_URL}${this.POKEMON_EXTENSION}${pokemon}`)
        .pipe(untilDestroyed(this));
    });

    return combineLatest(pokemons$).pipe(untilDestroyed(this));
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

  getAbilityByID(id: string): Observable<Ability> {
    return this.http
      .get<Ability>(`${this.BASE_URL}${this.ABILITY_EXTENSION}${id}`)
      .pipe(untilDestroyed(this));
  }

  getPokemonAbilitiesByIDS(ids: string[]): Observable<Ability[]> {
    const ids$ = ids.map((id) => this.getAbilityByID(id));
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
          const flavor_text_index = flavor_text_entries.length - 1;
          ability.flavor_text_entries = [
            flavor_text_entries[flavor_text_index],
          ];
          return ability;
        });

        return formattedAbilities;
      }),
      catchError((error) => of(error))
    );
    return abilities$;
  }

  getMoveByID(id: string): Observable<Move> {
    return this.http
      .get<Move>(`${this.BASE_URL}${this.MOVE_EXTENSION}${id}`)
      .pipe(untilDestroyed(this));
  }

  getMovesByIDS(ids: string[]): Observable<Move[]> {
    const ids$ = ids.map((id) => this.getMoveByID(id));
    const moves$ = combineLatest(ids$).pipe(
      map((moves) => {
        const formattedMoves = moves.map((move) => {
          const flavor_text_entries = move.flavor_text_entries.filter(
            (entry) => entry.language.name === 'en'
          );

          const flavor_text_index = flavor_text_entries.length - 1;

          move.flavor_text_entries = [flavor_text_entries[flavor_text_index]];
          this.pokemonMoves = moves;
          return move;
        });

        return formattedMoves;
      })
    );
    return moves$;
  }

  getPokemonEvolutionsByName(
    pokemonName: string
  ): Observable<PokemonEvolutions> {
    this.request$$.next(true);

    const pokeName = pokemonName.replace(this.EXCLUDED_NAMES, '');

    const specie$ = this.getSpeciesByName(pokeName);
    const evolutionChain$ = specie$.pipe(
      switchMap((specie) => {
        const url = specie.evolution_chain.url;
        const chainPath = url.split('/')[6];
        return this.getEvolutionChainById(+chainPath);
      })
    );

    const forms$ = evolutionChain$.pipe(
      map(({ chain }) => {
        let forms: Array<string | number> = chain.evolves_to.map(
          (pokemon) => pokemon.species.name
        );

        if (chain.evolves_to.length <= 0) {
          forms = [chain.species.name];
          return forms;
        }

        const hasEvolutions = chain.evolves_to.length === 1;

        if (hasEvolutions) {
          const firstForm = chain.species.url.split('/')[6];
          const secondForm = chain.evolves_to[0]?.species.url.split('/')[6];
          const thirdForm =
            chain.evolves_to[0]?.evolves_to[0]?.species.url.split('/')[6];

          forms = [firstForm, secondForm, thirdForm].filter((form) => form);
          return forms;
        }

        forms = [chain.species.name, ...forms];

        return forms;
      })
    );

    const species$ = forms$.pipe(
      switchMap((forms) => {
        const pokemons$ = this.getPokemonsByList(forms);
        return pokemons$.pipe(
          switchMap((pokemons) => {
            const otherSpecies = pokemons.map((pokemon) => {
              const name = pokemon.name.replace(this.EXCLUDED_NAMES, '');
              return this.getSpeciesByName(name);
            });
            return combineLatest(otherSpecies);
          })
        );
      })
    );

    const varietiesPokemon$ = species$.pipe(
      switchMap((species) => {
        const variables$ = this.getPokemonVariates(species);
        return variables$;
      })
    );

    const evolutionForms$ = forms$.pipe(
      switchMap((forms) => {
        return this.getPokemonsByList(forms);
      }),
      catchError(() => of([]))
    );

    const pokemonEvolutions$ = combineLatest([
      species$,
      evolutionForms$,
      varietiesPokemon$,
    ]).pipe(untilDestroyed(this));

    return pokemonEvolutions$.pipe(
      map(([species, forms, varietiesPokemon]) => {
        const lastSpecie = species[species.length - 1];

        const flavor_text_entries = lastSpecie.flavor_text_entries.filter(
          (entry) => entry.language.name === 'en'
        )[0];
        flavor_text_entries.flavor_text =
          flavor_text_entries.flavor_text.replace('POKéMON', 'pokémon');
        lastSpecie.flavor_text_entries = [flavor_text_entries];

        const data = {
          species: lastSpecie,
          evolutions: forms,
          varietiesPokemon: varietiesPokemon,
        };

        this.request$$.next(false);
        return data;
      })
    );
  }

  private getPokemonVariates(
    evolutionChainSpecies: PokemonSpecies[]
  ): Observable<Pokemon[]> {
    const variatesPokemons: Variety[] = evolutionChainSpecies.flatMap(
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
            !varieties.pokemon.name.includes('phd') &&
            !varieties.pokemon.name.includes('starter');

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

    if (listVariantes.length === 0) return of([]);

    const variables: Observable<Pokemon[]> =
      this.getPokemonsByList(listVariantes);

    return variables;
  }
}
