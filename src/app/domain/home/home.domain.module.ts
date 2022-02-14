import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
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
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class HomeDomainModule {}
