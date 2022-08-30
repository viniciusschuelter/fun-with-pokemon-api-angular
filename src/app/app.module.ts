import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

import {StoreModule} from '@ngrx/store';

import {AngularFireModule} from '@angular/fire/compat';
import {environment} from 'src/environments/environment';

import {AuthReducer} from './store/auth/auth.reducer';

import {SoonComponent} from './components/shared/soon/soon.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ServiceWorkerModule} from '@angular/service-worker';
import {CoreModule} from './modules/core/core.module';
import {SharedModule} from './modules/shared_modules/shared.module';
import {OverlayModule} from '@angular/cdk/overlay';
import { ToastrModule } from 'ngx-toastr';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    NotFoundComponent,
    SoonComponent,
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
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
