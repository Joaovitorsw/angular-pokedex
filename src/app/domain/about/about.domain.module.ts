import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutDomainRoutingModule } from './about.domain-routing.module';
import { AboutPage } from './pages/about/about.page';

@NgModule({
  declarations: [AboutPage],
  imports: [CommonModule, AboutDomainRoutingModule],
})
export class AboutDomainModule {}
