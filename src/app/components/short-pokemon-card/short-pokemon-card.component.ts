import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { ShortPokemon } from 'poke-api-models';

@Component({
  selector: 'px-short-pokemon-card',
  templateUrl: './short-pokemon-card.component.html',
  styleUrls: ['./short-pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortPokemonCardComponent {
  stats_overall = 0.1;
  color: string;
  @Input() pokemon: ShortPokemon;
  @HostBinding('attr.type') get type(): string {
    return this.pokemon.types[0].type.name;
  }
  get stats_total(): number {
    return this.pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
  }
}
