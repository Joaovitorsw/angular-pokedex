import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { POKEMONS } from '@pokedex/pages';

@Directive({
  selector: 'img [pxPokemonSprite]',
})
export class PokemonSpriteDirective implements OnInit {
  @Input('pxPokemonSprite') id: number;
  @Input('pxPokemonSpritePokemonName') pokemonName: string;
  readonly BASE_URL =
    'https://raw.githubusercontent.com/Joaovitorsw/poke-gifs/main/normal/';
  readonly EXTENSION = '.gif';
  @HostBinding('src') src: string;
  @HostListener('error') onError() {
    const defaultSprite = POKEMONS[this.id].sprites.front_default;
    const omegaRubySprite =
      POKEMONS[this.id].sprites.versions['generation-vi'][
        'omegaruby-alphasapphire'
      ].front_default;
    const spritePath = omegaRubySprite ?? defaultSprite;
    this.src = spritePath as string;
  }

  ngOnInit(): void {
    this.src = this.getSpritePath();
  }

  getSpritePath() {
    return `${this.BASE_URL}${this.pokemonName}${this.EXTENSION}`;
  }
}
