import { Component, OnInit } from '@angular/core';
import PokeAPI from 'pokedex-promise-v2';
import { Observable } from 'rxjs';
import { PokeAPIService } from 'src/app/services/poke-api/poke-api.service';

@Component({
  selector: 'px-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items$: Observable<PokeAPI.Pokemon[]>;
  megas$: Observable<PokeAPI.Pokemon[]>;
  constructor(private pokeAPI: PokeAPIService) {
    const maxPokemons = Array.from({ length: 898 }, (_, index) => ++index);
    this.items$ = this.pokeAPI.getPokemonsByList(maxPokemons.slice(0, 8));

    this.megas$ = this.pokeAPI.getPokemonsByList([
      10033, 10034, 10035, 10036, 10037, 10038, 10039, 10040,
    ]);
  }

  ngOnInit(): void {}

  trackByFn(index: number, item: any) {
    return index;
  }
}
