import { Component, EventEmitter, HostBinding, OnInit } from '@angular/core';
import { PokeAPIService } from '@pokedex/services';
import { particles, particlesAnimations } from '@pokedex/shared';
import { Container, IOptions, RecursivePartial } from 'ng-particles';
import { take } from 'rxjs/operators';

@Component({
  selector: 'px-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @HostBinding('class.loading') hasLoading = true;
  particlesOptions: RecursivePartial<IOptions>;
  container: Container;
  id = 'home-page';
  particlesEvent: EventEmitter<Container> = new EventEmitter();
  constructor(public pokeAPI: PokeAPIService) {}

  ngOnInit(): void {
    particlesAnimations.homePage();
    this.particlesOptions = particles;
    this.pokeAPI.getPokemonsFirstRange();
    this.pokeAPI.request$$.pipe(take(1)).subscribe((request) => {
      this.hasLoading = !request;
    });
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
