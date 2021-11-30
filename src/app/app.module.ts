import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPage } from './pages/about/about.page';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [AppComponent, HomePage, AboutPage],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomePage, data: { animation: 'HomePage' } },
      { path: 'about', component: AboutPage, data: { animation: 'AboutPage' } },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
