import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { StoreModule } from '@ngrx/store';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { AuthReducer } from './store/auth/auth.reducer';

import { SoonComponent } from './components/shared/soon/soon.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared_modules/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { EffectsModule } from '@ngrx/effects';
import {
  EntityDataModule,
  EntityDataModuleConfig,
  EntityMetadata,
  EntityMetadataMap
} from '@ngrx/data';
import { Pokemon } from './models/interfaces';

const entityMetadata: EntityMetadataMap = {Pokemon: <EntityMetadata<Pokemon>>{ selectId: model => model.name }};

const pluralNames = {Pokemon: 'Pokemons'};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NotFoundComponent,
    FooterComponent,
    SoonComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: AuthReducer, pokemon: null }, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),
    ToastrModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
