import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableWidgetModule } from 'app/components/table/table-widget.module';
import { TypeCardWidgetModule } from 'app/components/type-card/type-card.widget.module';
import { ColorProgressBarWidgetModule } from 'app/directives/color-progress-bar/color-progress-bar.widget.module';
import { PokemonSpriteWidgetModule } from 'app/directives/pokemon-sprite/pokemon-sprite.widget.module';
import { HeightWidgetModule } from 'app/pipes/height/height.widget.module';
import { PadStartWidgetModule } from 'app/pipes/pad-start/pad-start.widget.module';
import { PokemonTextTitleCaseWidgetModule } from 'app/pipes/pokemon-text-title-case/pokemon-text-title-case.widget.module';
import { WeightWidgetModule } from 'app/pipes/weight/weight.widget.module';
import { NgParticlesModule } from 'ng-particles';
import { AboutDomainRoutingModule, AboutPage } from '.';
import { AbilitiesContentComponent } from './components/abilities-content/abilities-content.component';
import { DamageRelationsContentComponent } from './components/damage-relations-content/damage-relations-content.component';
import { FormsContentComponent } from './components/forms-content/forms-content.component';
import { MovesContentComponent } from './components/moves-content/moves-content.component';
import { StatsContainerComponent } from './components/stats-content/stats-content.component';
import { FlavorTextPipe } from './pipes';

@NgModule({
  declarations: [
    AboutPage,
    AbilitiesContentComponent,
    DamageRelationsContentComponent,
    StatsContainerComponent,
    FlavorTextPipe,
    FormsContentComponent,
    MovesContentComponent,
  ],
  imports: [
    CommonModule,
    TypeCardWidgetModule,
    ColorProgressBarWidgetModule,
    TableWidgetModule,
    AboutDomainRoutingModule,
    NgParticlesModule,
    PokemonTextTitleCaseWidgetModule,
    HeightWidgetModule,
    WeightWidgetModule,
    MatProgressSpinnerModule,
    PokemonSpriteWidgetModule,
    PadStartWidgetModule,
  ],
})
export class AboutDomainModule {}
