import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPage } from './pages/about/about.page';

const routes: Routes = [
  {
    path: '',
    component: AboutPage,
    data: { animation: 'AboutPage' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutDomainRoutingModule {}
