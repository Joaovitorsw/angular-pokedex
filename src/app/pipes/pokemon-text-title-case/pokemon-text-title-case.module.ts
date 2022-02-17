import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonTextTitleCasePipe } from '..';

@NgModule({
  declarations: [PokemonTextTitleCasePipe],
  exports: [PokemonTextTitleCasePipe],
  imports: [CommonModule],
})
export class PokemonTextTitleCaseWidgetModule {}
