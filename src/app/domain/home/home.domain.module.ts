import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShortPokemonCardComponent } from 'app/components/short-pokemon-card/short-pokemon-card.component';
import { ColorProgressBarDirective } from 'app/directives/color-progress-bar';
import { HomeDomainRoutingModule } from './home.domain-routing.module';
import { HomePage } from './pages';

@NgModule({
  declarations: [
    HomePage,
    ShortPokemonCardComponent,
    ColorProgressBarDirective,
  ],
  imports: [CommonModule, HomeDomainRoutingModule, MatProgressBarModule],
})
export class HomeDomainModule {}
