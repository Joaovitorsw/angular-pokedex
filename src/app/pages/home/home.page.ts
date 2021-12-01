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
  items: Observable<PokeAPI.Pokemon[]>;
  constructor(private pokeAPI: PokeAPIService) {
    const indexArray = Array.from({ length: 15 }, (_, index) => ++index);
    this.items = this.pokeAPI.getPokemonsByList(indexArray);
  }

  ngOnInit(): void {}
}
