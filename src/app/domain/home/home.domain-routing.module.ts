import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: { animation: 'HomePage' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDomainRoutingModule {}
