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
  @Input() pokemon: ShortPokemon;
  @HostBinding('attr.type') get type(): string {
    return this.pokemon.types.map((type) => type.type.name)[0];
  }
  get stats_total(): number {
    return this.pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
  }
}
