import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/homePage/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

import {StoreModule} from '@ngrx/store';

import {FavoritesComponent} from './components/favorites/favorites/favorites.component';

import {PokemonDetailsComponent} from './components/pokemon/pokemon-details/pokemon-details.component';
import {PokemonCardComponent} from './components/pokemon/pokemon-card/pokemon-card.component';
import {FiltersBarComponent} from './components/shared/filters-bar/filters-bar.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from 'src/environments/environment';

import {AuthReducer} from './store/auth/auth.reducer';

import {LazyLoadingScrollComponent} from './components/shared/lazy-loading-scroll/lazy-loading-scroll.component';
import {PokemonMoreDetailsComponent} from './components/pokemon/pokemon-more-details/pokemon-more-details.component';

import {SoonComponent} from './components/shared/soon/soon.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ServiceWorkerModule} from '@angular/service-worker';
import {CoreModule} from './modules/core/core.module';
import {SharedModule} from './modules/shared_modules/shared.module';
import {PokemonTypeComponent} from './components/pokemon/pokemon-type/pokemon-type.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { ToastrModule } from 'ngx-toastr';
import {PokemonCarouselComponent} from './components/pokemon/pokemon-caurosel/pokemon-carousel.component';
import {PokemonStatsComponent} from './components/pokemon/pokemon-stats/pokemon-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    FavoritesComponent,
    PokemonDetailsComponent,
    PokemonCardComponent,
    FiltersBarComponent,
    LazyLoadingScrollComponent,
    PokemonMoreDetailsComponent,
    PokemonTypeComponent,
    SoonComponent,
    PokemonCarouselComponent,
    PokemonStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({auth: AuthReducer}, {}),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DragDropModule,
    OverlayModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
    ToastrModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
