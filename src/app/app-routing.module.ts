import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SoonComponent } from './components/shared/soon/soon.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home-routing.module').then(
        m => m.HomeRoutingModule
      )
  },

  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/favorites/favorites-routing.module').then(
        m => m.FavoritesRoutingModule
      )
  },

  {
    path: 'pokemon/:url',
    loadChildren: () => import('./pages/pokemon-details/pokemon-details-routing.module').then(
        m => m.PokemonDetailsRoutingModule
      )
  },

  {
    path: 'auth',
    loadChildren: () => import('../app/modules/feature_modules/auth/auth.module').then(
        module => module.AuthModule
      )
  },

  { path: 'soon', component: SoonComponent },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
