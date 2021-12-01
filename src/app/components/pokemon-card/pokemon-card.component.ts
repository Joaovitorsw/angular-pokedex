import { Component, Input, OnInit } from '@angular/core';
import PokeAPI from 'pokedex-promise-v2';

@Component({
  selector: 'px-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: PokeAPI.Pokemon;
  constructor() {}

  ngOnInit(): void {}
}
