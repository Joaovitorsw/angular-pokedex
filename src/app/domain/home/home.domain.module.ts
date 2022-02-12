import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShortPokemonCardComponent } from 'app/components/short-pokemon-card/short-pokemon-card.component';
import { HomeDomainRoutingModule } from './home.domain-routing.module';
import { HomePage } from './pages';

@NgModule({
  declarations: [HomePage, ShortPokemonCardComponent],
  imports: [CommonModule, HomeDomainRoutingModule],
})
export class HomeDomainModule {}
