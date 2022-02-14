import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShortPokemonCardComponent } from 'app/components/short-pokemon-card/short-pokemon-card.component';
import { ColorProgressBarDirective } from 'app/directives/color-progress-bar';
import { PokemonSpriteDirective } from 'app/directives/pokemon-sprite';
import { HeightPipe } from 'app/pipes/height';
import { PadStartPipe } from 'app/pipes/pad-start';
import { PokemonTextTitleCasePipe } from 'app/pipes/pokemon-text-title-case';
import { WeightPipe } from 'app/pipes/weight';
import { HomeDomainRoutingModule } from './home.domain-routing.module';
import { HomePage } from './pages';

@NgModule({
  declarations: [
    HomePage,
    ShortPokemonCardComponent,
    ColorProgressBarDirective,
    WeightPipe,
    HeightPipe,
    PadStartPipe,
    PokemonTextTitleCasePipe,
    PokemonSpriteDirective,
  ],
  imports: [
    CommonModule,
    HomeDomainRoutingModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
  ],
})
export class HomeDomainModule {}
