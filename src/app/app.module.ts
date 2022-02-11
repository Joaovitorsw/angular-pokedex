import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgParticlesModule } from 'ng-particles';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DamageRelationsCardComponent } from './components/damage-relations-card/damage-relations-card.component';
import { FlipCardComponent } from './components/flip-card/flip-card.component';
import { PokemonBackCardComponent } from './components/pokemon-back-card/pokemon-back-card.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { SlideOptionComponent } from './components/slide-option/slide-option.component';
import { TableComponent } from './components/table/table.component';
import { TypeCardComponent } from './components/type-card/type-card.component';
import { ColorProgressBarDirective } from './directives/color-progress-bar/color-progress-bar.directive';
import { PokemonSpriteDirective } from './directives/pokemon-sprite/pokemon-sprite.directive';
import { ShowValidationErrorDirective } from './directives/show-validation-error';
import { AboutPage } from './pages/about/about.page';
import { HomePage } from './pages/home/home.page';
import { FlavorTextPipe } from './pipes/flavor-text/flavor-text.pipe';
import { HeightPipe } from './pipes/height/height.pipe';
import { PadStartPipe } from './pipes/pad-start/pad-start.pipe';
import { PokemonTitleCasePipe } from './pipes/pokemon-title-case/pokemon-title-case.pipe';
import { TypeIconPathPipe } from './pipes/type-icon-path/type-icon-path.pipe';
import { WeightPipe } from './pipes/weight/weight.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    AboutPage,
    PokemonCardComponent,
    TypeIconPathPipe,
    PokemonTitleCasePipe,
    PadStartPipe,
    TypeCardComponent,
    WeightPipe,
    HeightPipe,
    ShowValidationErrorDirective,
    ColorProgressBarDirective,
    SlideOptionComponent,
    PokemonSpriteDirective,
    DamageRelationsCardComponent,
    FlipCardComponent,
    PokemonBackCardComponent,
    FlavorTextPipe,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatPaginatorModule,
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
    MatToolbarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
