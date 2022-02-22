import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonTextTitleCasePipe } from './pokemon-text-title-case.pipe';

@NgModule({
  declarations: [PokemonTextTitleCasePipe],
  exports: [PokemonTextTitleCasePipe],
  imports: [CommonModule],
})
export class PokemonTextTitleCaseWidgetModule {}
