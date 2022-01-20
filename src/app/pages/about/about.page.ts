import {
  Component,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeAPIService } from '@pokedex/services';
import { particles, particlesAnimations } from '@pokedex/shared';
import { Container, IOptions, RecursivePartial } from 'ng-particles';
import PokeAPI, { Pokemon, PokemonEvolutions } from 'poke-api-models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'px-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, OnDestroy {
  @HostBinding('attr.type') type: string;
  particlesEvent: EventEmitter<Container> = new EventEmitter();
  container: Container;
  pokemon$: Observable<PokeAPI.Pokemon>;
  pokemonDetails$: Observable<PokemonEvolutions>;
  particlesOptions: RecursivePartial<IOptions>;
  stats_conversion = 0.393;
  id = 'about-page';
  hasChanged: boolean;

  constructor(private route: ActivatedRoute, public pokeAPI: PokeAPIService) {}

  ngOnInit(): void {
    this.route.params.forEach(({ pokemonName }) => {
      this.hasChanged = false;
      this.pokemon$ = this.pokeAPI.getPokemonByNameOrID(pokemonName).pipe(
        tap(async (pokemon) => {
          this.setBodyClass(pokemon);
          this.getAnimation();
          this.pokemonDetails$ = await this.pokeAPI.getPokemonEvolutions(
            pokemon.name
          );
          window.scrollTo(0, 0);
        })
      );
    });
  }

  ngOnDestroy(): void {
    const $body = document.body;
    $body.classList.remove(this.type);
  }

  setBodyClass(pokemon: Pokemon) {
    const $body = document.body;
    $body.classList.remove(this.type);
    this.type = pokemon.types[0].type.name;
    $body.classList.add(this.type);
  }

  particlesLoaded(container: Container) {
    this.container = container;
    this.particlesEvent.emit(container);
  }

  getAnimation() {
    particlesAnimations[this.type]();
    this.particlesOptions = particles;
    this.hasChanged = true;
  }
}
