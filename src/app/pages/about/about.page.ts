import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Container, IOptions, RecursivePartial } from 'ng-particles';
import { Pokemon } from 'pokedex-promise-v2';
import { PokeAPIService } from 'src/app/services/poke-api/poke-api.service';
import { particles, particlesAnimations } from 'src/assets/particles';

@Component({
  selector: 'px-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  @HostBinding('attr.type') type: string;
  pokemon: Pokemon;
  id = 'about-page';
  container: Container;
  particlesOptions: RecursivePartial<IOptions>;

  constructor(private route: ActivatedRoute, private api: PokeAPIService) {
    this.route.params.forEach(({ pokemonName }) => {
      this.api.getPokemonByNameOrID(pokemonName).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.type = pokemon.types[0].type.name;
        particlesAnimations[this.type]();
        this.particlesOptions = particles;
      });
    });
  }

  particlesLoaded(event: Container) {
    event.actualOptions.load(particles);
  }
}
