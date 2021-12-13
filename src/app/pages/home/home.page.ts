import { Component } from '@angular/core';
import PokeAPI from 'pokedex-promise-v2';
import { BehaviorSubject } from 'rxjs';
import { PokeAPIService } from 'src/app/services/poke-api/poke-api.service';

@Component({
  selector: 'px-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  pokemons$$: BehaviorSubject<PokeAPI.Pokemon[]>;
  constructor(private pokeAPI: PokeAPIService) {
    const pokemons$ = this.pokeAPI.getPokemonsByRange(1, 24);
    pokemons$.subscribe((pokemons) => {
      this.pokemons$$ = new BehaviorSubject(pokemons);
    });
  }

  endScroll() {
    const pokemonsLength = this.pokemons$$.value.length + 1;
    const nextLength = 24;
    this.addPokemons(pokemonsLength, nextLength);
  }

  addPokemons(previous: number, next: number): void {
    this.pokeAPI.getPokemonsByRange(previous, next).subscribe((pokemons) => {
      const previousPokemons = this.pokemons$$.value;
      this.pokemons$$.next([...previousPokemons, ...pokemons]);
    });
  }

  trackByFn(index: number, item: any) {
    const id = index + 1;
    if (id !== item.id) return;
    return item.id;
  }
}
