import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import PokeAPI from 'pokedex-promise-v2';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { TypeCardComponent } from './components/type-card/type-card.component';
import { AboutPage } from './pages/about/about.page';
import { HomePage } from './pages/home/home.page';
import { PadStartPipe } from './pipes/pad-start/pad-start.pipe';
import { PokemonTitleCasePipe } from './pipes/pokemon-title-case/pokemon-title-case.pipe';
import { SpritePathPipe } from './pipes/sprite-path/sprite-path.pipe';
import { TypeIconPathPipe } from './pipes/type-icon-path/type-icon-path.pipe';
import { WeightPipe } from './pipes/weight/weight.pipe';
import { HeightPipe } from './pipes/height/height.pipe';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
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
