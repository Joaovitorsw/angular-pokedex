import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Container, IOptions, RecursivePartial } from 'ng-particles';
import PokeAPI from 'pokedex-promise-v2';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import {
  PokeAPIService,
  PokemonEvolutions,
} from 'src/app/services/poke-api/poke-api.service';
import {
  particles,
  particlesAnimations,
} from 'src/app/shared/ts-particles/particles.options';

@Component({
  selector: 'px-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  container: Container;
  @HostListener('window:hashchange', ['$event'])
  hashChangeHandler(): void {
    this.hasChanged = false;
  }
  particlesEvent: EventEmitter<Container> = new EventEmitter();

  @HostBinding('attr.type') type: string;
  @HostBinding('class.has-evolution') hasEvolution = false;

  pokemon$: Observable<PokeAPI.Pokemon>;
  pokemonDetails$: Observable<PokemonEvolutions>;
  stats_conversion = 0.393;
  id = 'about-page';
  particlesOptions: RecursivePartial<IOptions>;
  hasChanged: boolean;

  constructor(private route: ActivatedRoute, public pokeAPI: PokeAPIService) {}

  ngOnInit(): void {
    this.route.params.forEach(({ pokemonName }) => {
      this.pokemon$ = this.pokeAPI.getPokemonByNameOrID(pokemonName).pipe(
        tap(async (pokemon) => {
          this.type = pokemon.types[0].type.name;
          this.getAnimation();
          const $evolution = await this.pokeAPI.getPokemonEvolutions(
            pokemon.name
          );
          this.pokemonDetails$ = $evolution.pipe(
            tap(
              (evolutions) =>
                (this.hasEvolution = evolutions.evolutions.length > 0)
            )
          );
        })
      );
      window.scrollTo(0, 0);
    });
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
