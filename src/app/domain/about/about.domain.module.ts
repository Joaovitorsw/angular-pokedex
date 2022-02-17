import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonSpriteWidgetModule } from 'app/directives/pokemon-sprite/pokemon-sprite.module';
import { HeightWidgetModule } from 'app/pipes/height/height.module';
import { PadStartWidgetModule } from 'app/pipes/pad-start/pad-start.module';
import { PokemonTextTitleCaseWidgetModule } from 'app/pipes/pokemon-text-title-case/pokemon-text-title-case.module';
import { WeightWidgetModule } from 'app/pipes/weight/weight.module';
import { NgParticlesModule } from 'ng-particles';
import { AboutDomainRoutingModule } from './about.domain-routing.module';
import { AboutPage } from './pages/about/about.page';

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
