import { Component, HostBinding, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOptions, RecursivePartial } from 'ng-particles';
import { Pokemon } from 'pokedex-promise-v2';
import { PokeAPIService } from 'src/app/services/poke-api/poke-api.service';
import { particles, particlesAnimations } from 'src/assets/particles';
@Component({
  selector: 'px-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  @HostListener('window:hashchange', ['$event'])
  hashChangeHandler(): void {
    this.hasChanged = false;
  }
  @HostBinding('attr.type') type: string;
  pokemon: Pokemon;
  id = 'about-page';
  particlesOptions: RecursivePartial<IOptions>;
  stats_conversion = 2;
  hasChanged: boolean;

  constructor(private route: ActivatedRoute, private api: PokeAPIService) {
    this.route.params.forEach(({ pokemonName }) => {
      this.api.getPokemonByNameOrID(pokemonName).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.type = pokemon.types[0].type.name;
        particlesAnimations[this.type]();
        this.particlesOptions = particles;
        this.hasChanged = true;
      });
    });
  }
}
