import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit
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
  private OMEGA_RUBY_VERSION: string | null;
  private DEFAULT_VERSION: string;
  private GENERATION_VIII_VERSION: string | null;

  @HostBinding('src') src: string;
  @HostListener('error') onError() {
    const updatedSprite = this.OMEGA_RUBY_VERSION ?? this.GENERATION_VIII_VERSION;
    const spritePath = updatedSprite ?? this.DEFAULT_VERSION;
    this.src = spritePath;
  }

  ngOnInit(): void {    
    this.src = this.getSpritePath();

    if (!this.sprites) return;

    this.OMEGA_RUBY_VERSION = this.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default;
    this.DEFAULT_VERSION = this.sprites.front_default as string;
    this.GENERATION_VIII_VERSION = this.sprites.versions['generation-viii']?.icons?.front_default;
  }

  getSpritePath() {
    if (this.name) return `${this.BASE_URL}${this.name}${this.EXTENSION}`;

    return this.OMEGA_RUBY_VERSION ?? this.DEFAULT_VERSION;
  }
}
