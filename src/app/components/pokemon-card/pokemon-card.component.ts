import {
  Component,
  HostBinding,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Pokemon } from 'poke-api-models';

@Component({
  selector: 'px-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  stats_overall = 0.1;
  color: string;
  @Input() pokemon: Pokemon;
  @ViewChildren('pokemonImage') pokemonImage: QueryList<HTMLImageElement>;
  @HostBinding('attr.type') get type(): string {
    return this.pokemon.types[0].type.name;
  }
  get stats_total(): number {
    return this.pokemon.stats.reduce((acc, cur) => acc + cur.base_stat, 0);
  }
}
