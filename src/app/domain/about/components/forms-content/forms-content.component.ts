import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { PokeApiService } from '@pokedex/services';
import { Pokemon, PokemonSpecies, Variety } from 'poke-api-models';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { SPECIE_PATTERN } from '../../pages/about/about.page.variables';

@Component({
  selector: 'px-forms-content',
  templateUrl: './forms-content.component.html',
  styleUrls: ['./forms-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsContentComponent implements OnInit {
  @HostBinding('class.has-evolutions') hasEvolution = false;
  @Input() pokeAPI: PokeApiService;
  @Input('pokemonSpecie') pokemonSpecie$: Observable<PokemonSpecies>;
  @Input() pokemon: Pokemon;
  isGalar: boolean = false;
  forms$: Observable<Pokemon[]>;
  varieties$: Observable<Pokemon[]>;
  private specie: PokemonSpecies;

  ngOnInit(): void {
    this.isGalar = this.pokemon.name.includes('-galar');
    this.forms$ = this.getEvolutions().pipe(
      tap((pokemons) => {
        this.hasEvolution = pokemons.length > 1;
      })
    );
    this.varieties$ = this.getFormsVarieties(this.forms$).pipe(
      map((pokemons) => {
        this.hasEvolution = pokemons.length > 1;

        pokemons.sort((a, b) => a.id - b.id);
        return pokemons;
      })
    );
  }

  private getEvolutions(): Observable<Pokemon[]> {
    const evolutionChain$ = this.pokemonSpecie$.pipe(
      switchMap((specie) => {
        const url = specie.evolution_chain.url;
        this.specie = specie;
        const chainPath = url.split('/')[6];
        return this.pokeAPI.getEvolutionChainById(+chainPath);
      })
    );

    const forms$ = evolutionChain$.pipe(
      map(({ chain }) => {
        console.log();
        let forms: Array<string | number> = chain.evolves_to.map(
          (pokemon) => pokemon.species.name
        );

        if (chain.evolves_to.length <= 0) {
          forms = [this.specie.id];
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

    const evolutions$ = forms$.pipe(
      switchMap((forms) => {
        const pokemonForms = forms.map((form) => {
          if (form == this.pokemon.id) {
            return of(this.pokemon);
          }
          return this.pokeAPI.getPokemonByNameOrID(form);
        });
        return combineLatest(pokemonForms);
      })
    );

    return evolutions$;
  }

  private getFormsVarieties(
    forms$: Observable<Pokemon[]>
  ): Observable<Pokemon[]> {
    const species$ = forms$.pipe(
      switchMap((pokemons) => {
        const otherSpecies = pokemons.map((pokemon) => {
          const name = pokemon.name.replace(SPECIE_PATTERN, '');
          return this.pokeAPI.getSpeciesByNameOrID(name);
        });
        return combineLatest(otherSpecies);
      })
    );

    const varieties$ = species$.pipe(
      map((species) => {
        return species
          .map((species: PokemonSpecies) => {
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
          })
          .flatMap((variante) => variante);
      })
    );

    return varieties$.pipe(
      switchMap((varieties) => {
        if (varieties.length === 0) return of([]);

        const pokemons = varieties.map((variety) => variety.pokemon.name);
        return this.pokeAPI.getPokemonsByList(pokemons);
      })
    );
  }
}
