import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonSpriteDirective } from '.';

@NgModule({
  declarations: [PokemonSpriteDirective],
  exports: [PokemonSpriteDirective],
  imports: [CommonModule],
})
export class PokemonSpriteWidgetModule {}
