import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import PokeAPI from 'pokedex-promise-v2';

@Component({
  selector: 'px-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent {
  @Input() pokemon: PokeAPI.Pokemon;
  @ViewChild('pokemonImage') pokemonImage: HTMLImageElement;
  @HostBinding('attr.type') get type(): string {
    return this.pokemon.types[0].type.name;
  }
  get stats_total(): number {
    return this.pokemon.stats.reduce((acc, cur) => acc + cur.base_stat, 0);
  }
  stats_overall = 0.1;
  color: string;
}
