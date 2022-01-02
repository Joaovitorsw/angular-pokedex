import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgParticlesModule } from 'ng-particles';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import PokeAPI from 'pokedex-promise-v2';
import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { SlideOptionComponent } from './components/slide-option/slide-option.component';
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
    SlideOptionComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSidenavModule,
    NgxIndexedDBModule.forRoot(environment.dbConfig),
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
