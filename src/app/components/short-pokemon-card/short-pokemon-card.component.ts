import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DAMAGE_RELATIONS } from '@pokedex/database';
import { ShortPokemon } from 'poke-api-models';

@Component({
  selector: 'px-short-pokemon-card',
  templateUrl: './short-pokemon-card.component.html',
  styleUrls: ['./short-pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortPokemonCardComponent implements OnChanges {
  stats_overall = 0.1;
  color: string;
  damageFrom: string;
  weakness: string;
  quadDamage: boolean;
  @HostBinding('attr.data-testid') dataTestID = 'short-pokemon-card';
  @Input('weakness')
  selectedWeakness?: string | null;
  @Input() pokemon: ShortPokemon;
  @HostBinding('attr.type') get type(): string {
    return this.pokemon.types[0].type.name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedWeakness']) {
      const pokemonWeakness = this.pokemon.types.map((type) => {
        return DAMAGE_RELATIONS.filter(
          (relation) => relation.name === type.type.name
        );
      });

      const doubleDamage = pokemonWeakness
        .flatMap((weakness) => weakness)
        .flatMap((weakness) => weakness.damage_relations.double_damage_from);

      const mostWeakness = doubleDamage.filter(
        (elemento, index, array) => !(array.indexOf(elemento) === index)
      );

      this.quadDamage = mostWeakness.includes(this.selectedWeakness ?? '');
      this.damageFrom = this.quadDamage ? '4X' : '2X';

      this.weakness =
        doubleDamage.find((weakness) => weakness === this.selectedWeakness) ??
        mostWeakness.find((weakness) => weakness === this.selectedWeakness)!;
    }
  }

  get stats_total(): number {
    return this.pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
  }
}
