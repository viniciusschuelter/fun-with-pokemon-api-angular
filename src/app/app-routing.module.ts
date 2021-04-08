import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {FavoritesComponent} from './components/favorites/favorites/favorites.component';
import {HomeComponent} from './components/homePage/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AuthGuard} from './auth.guard';
import {PokemonDetailsComponent} from './components/pokemon/pokemon-details/pokemon-details.component';
import {SoonComponent} from './components/shared/soon/soon.component';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'pokemon/:id',
    component: PokemonDetailsComponent,
  },

  {
    path: 'auth',

    loadChildren: () =>
      import('../app/modules/feature_modules/auth/auth.module').then(
        (module) => module.AuthModule
      ),
  },

  {path: 'soon', component: SoonComponent},

  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
