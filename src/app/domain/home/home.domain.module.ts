import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShortPokemonCardComponent } from 'app/components/short-pokemon-card/short-pokemon-card.component';
import { TypeCardComponent } from 'app/components/type-card';
import { ColorProgressBarDirective } from 'app/directives/color-progress-bar';
import { DisableControlDirective } from 'app/directives/disable-control/disable-control.directive';
import { PokemonSpriteWidgetModule } from 'app/directives/pokemon-sprite/pokemon-sprite.widget.module';
import { HeightWidgetModule } from 'app/pipes/height/height.widget.module';
import { PadStartWidgetModule } from 'app/pipes/pad-start/pad-start.widget.module';
import { PokemonTextTitleCaseWidgetModule } from 'app/pipes/pokemon-text-title-case/pokemon-text-title-case.widget.module';
import { TypeIconPathPipe } from 'app/pipes/type-icon-path';
import { WeightWidgetModule } from 'app/pipes/weight/weight.widget.module';
import { HomeDomainRoutingModule } from './home.domain-routing.module';
import { HomePage } from './pages';

@NgModule({
  declarations: [
    HomePage,
    TypeCardComponent,
    DisableControlDirective,
    TypeIconPathPipe,
    ShortPokemonCardComponent,
    ColorProgressBarDirective,
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
    MatProgressSpinnerModule,
    PokemonTextTitleCaseWidgetModule,
    HeightWidgetModule,
    WeightWidgetModule,
    PokemonSpriteWidgetModule,
    PadStartWidgetModule,
  ],
})
export class HomeDomainModule {}
