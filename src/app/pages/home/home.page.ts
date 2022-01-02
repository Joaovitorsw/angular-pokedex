import { Component, EventEmitter, OnInit } from '@angular/core';
import { Container, IOptions, RecursivePartial } from 'ng-particles';
import { PokeAPIService } from 'src/app/services/poke-api/poke-api.service';
import {
  particles,
  particlesAnimations,
} from 'src/app/shared/ts-particles/particles.options';

@Component({
  selector: 'px-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  particlesOptions: RecursivePartial<IOptions>;
  container: Container;
  id = 'home-page';
  particlesEvent: EventEmitter<Container> = new EventEmitter();
  constructor(public pokeAPI: PokeAPIService) {}

  ngOnInit(): void {
    particlesAnimations.homePage();
    this.particlesOptions = particles;
    this.pokeAPI.getPokemonsFirstRange();
  }

  endScroll() {
    const pokemonsLength = this.pokeAPI.pokemons$$.value.length + 1;
    const nextLength = 24;
    this.pokeAPI.nextPokemonsRange(pokemonsLength, nextLength);
  }

  particlesLoaded(container: Container) {
    this.container = container;
    this.particlesEvent.emit(container);
  }

  trackByFn(index: number, item: any) {
    const id = index + 1;
    if (id !== item.id) return;
    return item.id;
  }
}
