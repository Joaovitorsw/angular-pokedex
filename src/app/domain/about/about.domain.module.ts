import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonSpriteWidgetModule } from 'app/directives/pokemon-sprite/pokemon-sprite.widget.module';
import { HeightWidgetModule } from 'app/pipes/height/height.widget.module';
import { PadStartWidgetModule } from 'app/pipes/pad-start/pad-start.widget.module';
import { PokemonTextTitleCaseWidgetModule } from 'app/pipes/pokemon-text-title-case/pokemon-text-title-case.widget.module';
import { WeightWidgetModule } from 'app/pipes/weight/weight.widget.module';
import { NgParticlesModule } from 'ng-particles';
import { AboutDomainRoutingModule, AboutPage } from '.';

@NgModule({
  declarations: [AboutPage],
  imports: [
    CommonModule,
    AboutDomainRoutingModule,
    NgParticlesModule,
    PokemonTextTitleCaseWidgetModule,
    HeightWidgetModule,
    WeightWidgetModule,
    PokemonSpriteWidgetModule,
    PadStartWidgetModule,
  ],
})
export class AboutDomainModule {}
