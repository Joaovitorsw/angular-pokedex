import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '@pokedex/services';
import { particles, particlesAnimations } from 'app/shared/ts-particles';
import { IOptions, RecursivePartial } from 'ng-particles';
import { Pokemon } from 'poke-api-models';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'px-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, OnDestroy {
  @HostBinding('attr.type') type: string;
  pokemon$: Observable<Pokemon>;
  hasChanged: boolean;
  particlesOptions: RecursivePartial<IOptions>;

  constructor(private route: ActivatedRoute, public pokeAPI: PokeApiService) {}

  ngOnInit(): void {
    this.route.params.forEach(({ pokemonName }) => {
      this.hasChanged = false;

      this.pokemon$ = this.pokeAPI.getPokemonByNameOrID(pokemonName).pipe(
        tap((pokemon: Pokemon) => {
          this.setBodyClass(pokemon);
          this.getAnimation();
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

  getAnimation() {
    particlesAnimations[this.type]();
    this.particlesOptions = particles;
    this.hasChanged = true;
  }
}
