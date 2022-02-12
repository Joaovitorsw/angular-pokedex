import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { PokemonSprites } from 'poke-api-models';

@Directive({
  selector: 'img [pxPokemonSprite]',
})
export class PokemonSpriteDirective implements OnInit {
  @Input('pxPokemonSprite') sprites: PokemonSprites;
  @Input('pxPokemonSpriteName') name: string;

  readonly BASE_URL =
    'https://raw.githubusercontent.com/Joaovitorsw/poke-gifs/main/normal/';
  readonly EXTENSION = '.gif';

  @HostBinding('src') src: string;
  @HostListener('error') onError() {
    const defaultSprite = this.sprites.front_default;
    const lastSpriteVersion =
      this.sprites.versions['generation-viii']?.icons?.front_default;
    const omegaRubySprite =
      this.sprites.versions['generation-vi']['omegaruby-alphasapphire']
        .front_default;
    const updatedSprite = omegaRubySprite ?? lastSpriteVersion;
    const spritePath = updatedSprite ?? defaultSprite;
    this.src = spritePath as string;
  }

  ngOnInit(): void {
    this.src = this.getSpritePath();
  }

  getSpritePath() {
    return `${this.BASE_URL}${this.name}${this.EXTENSION}`;
  }
}
