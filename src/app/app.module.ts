import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgParticlesModule } from 'ng-particles';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import PokeAPI from 'pokedex-promise-v2';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { TypeCardComponent } from './components/type-card/type-card.component';
import { ColorProgressBarDirective } from './directives/color-progress-bar/color-progress-bar.directive';
import { AboutPage } from './pages/about/about.page';
import { HomePage } from './pages/home/home.page';
import { HeightPipe } from './pipes/height/height.pipe';
import { PadStartPipe } from './pipes/pad-start/pad-start.pipe';
import { PokemonTitleCasePipe } from './pipes/pokemon-title-case/pokemon-title-case.pipe';
import { SpritePathPipe } from './pipes/sprite-path/sprite-path.pipe';
import { TypeIconPathPipe } from './pipes/type-icon-path/type-icon-path.pipe';
import { WeightPipe } from './pipes/weight/weight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    AboutPage,
    PokemonCardComponent,
    SpritePathPipe,
    TypeIconPathPipe,
    PokemonTitleCasePipe,
    PadStartPipe,
    TypeCardComponent,
    WeightPipe,
    HeightPipe,
    ColorProgressBarDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgParticlesModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatProgressBarModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: PokeAPI, useValue: new PokeAPI() }],
  bootstrap: [AppComponent],
})
export class AppModule {}
