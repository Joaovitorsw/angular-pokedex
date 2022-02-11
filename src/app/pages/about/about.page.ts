import {
  Component,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeAPIService } from '@pokedex/services';
import { particles, particlesAnimations } from '@pokedex/shared';
import { Container, IOptions, RecursivePartial } from 'ng-particles';
import PokeAPI, {
  Ability,
  Move,
  Pokemon,
  PokemonEvolutions,
} from 'poke-api-models';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DamageRelations } from '..';
import { DAMAGE_RELATIONS } from '../home/home.page-damage-relations';
import { MoveDataTable } from './about.page.models';

@Component({
  selector: 'px-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, OnDestroy {
  @HostBinding('attr.type') type: string;
  particlesEvent: EventEmitter<Container> = new EventEmitter();
  container: Container;
  pokemon$: Observable<PokeAPI.Pokemon>;
  abilities$: Observable<Ability[]>;
  pokemonDetails$: Observable<PokemonEvolutions>;
  particlesOptions: RecursivePartial<IOptions>;
  stats_conversion = 0.393;
  abilities: string;
  damagesRelations: DamageRelations[];
  eggType: string;
  id = 'about-page';
  hasChanged: boolean;
  move$: Observable<Move>;
  movesTableData$: Observable<MoveDataTable[]>;
  moveTableData: MoveDataTable[];
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'category',
    'contest',
    'pp',
    'power',
    'accuracy',
  ];

  constructor(private route: ActivatedRoute, public pokeAPI: PokeAPIService) {}

  ngOnInit(): void {
    this.route.params.forEach(({ pokemonName }) => {
      this.hasChanged = false;
      this.pokemon$ = this.pokeAPI.getPokemonByNameOrID(pokemonName).pipe(
        tap((pokemon) => {
          this.setBodyClass(pokemon);
          this.getAnimation();

          this.damagesRelations = pokemon.types.map((type) => {
            const damageRelations = DAMAGE_RELATIONS.find(
              (damageRelations) => damageRelations.name === type.type.name
            )!;
            return damageRelations;
          });

          const names = pokemon.abilities.map((slot) => {
            if (slot.is_hidden) return `${slot.ability.name} (hidden)`;
            return slot.ability.name;
          });
          const urls = pokemon.abilities.map(
            (slot) => slot.ability.url.split('/')[6]
          );

          this.abilities = names.join(' | ');

          this.pokeAPI
            .getPokemonEvolutions(pokemon.name)
            .then((pokemonDetails$) => {
              this.pokemonDetails$ = pokemonDetails$.pipe(
                tap((evolutions) => {
                  console.log(evolutions);
                  this.eggType = evolutions.species.egg_groups
                    .map((slot) => slot.name)
                    .join(' | ');
                })
              );
            });

          this.abilities$ = this.pokeAPI.getPokemonAbilities(urls).pipe(
            map((ability) => {
              const data = ability.map((slot, index) => {
                if (pokemon.abilities[index].ability.name === slot.name) {
                  const isHidden = pokemon.abilities[index].is_hidden;
                  slot.name = isHidden ? `${slot.name} ( hidden )` : slot.name;
                }
                return slot;
              });
              return data;
            })
          );

          const movesID = pokemon.moves.map(
            (slot) => slot.move.url.split('/')[6]
          );

          this.movesTableData$ = this.pokeAPI.getMoveList(movesID).pipe(
            map((moves) => {
              const data = moves.map((move) => {
                return {
                  id: move.id,
                  name: move.name,
                  type: move.type.name ?? '-',
                  category: move.damage_class?.name ?? '-',
                  contest: move.contest_type?.name ?? '-',
                  pp: move.pp ?? '-',
                  power: move.power ?? '-',
                  accuracy: move.accuracy ?? '-',
                };
              });
              this.moveTableData = [data[0]];
              this.move$ = of(this.pokeAPI.pokemonMoves[0]);
              return data;
            })
          );
        })
      );
    });
  }

  updateMovesDetail({ id }: MoveDataTable) {
    const moveData = this.pokeAPI.pokemonMoves.find((move) => move.id === id)!;
    const moveTableData = [moveData].map((move) => {
      return {
        id: move.id,
        name: move.name,
        type: move.type.name ?? '-',
        category: move.damage_class?.name ?? '-',
        contest: move.contest_type?.name ?? '-',
        pp: move.pp ?? '-',
        power: move.power ?? '-',
        accuracy: move.accuracy ?? '-',
      } as MoveDataTable;
    });
    this.moveTableData = moveTableData;
    this.move$ = this.move$.pipe(
      map(() => {
        return moveData;
      })
    );
  }

  ngOnDestroy(): void {
    const $body = document.body;
    $body.classList.remove(this.type);
  }

  setBodyClass(pokemon: Pokemon) {
    const $body = document.body;
    $body.classList.remove(this.type);
    this.type = pokemon.types[0].type.name;
    $body.classList.add(this.type);
  }

  particlesLoaded(container: Container) {
    this.container = container;
    this.particlesEvent.emit(container);
  }

  getAnimation() {
    particlesAnimations[this.type]();
    this.particlesOptions = particles;
    this.hasChanged = true;
  }
}
