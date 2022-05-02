import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FavoritesComponent} from './favorites.component';
import {FavoritesModule} from './favorites.module';


const routes: Route[] = [
  {
    path: '',
    component: FavoritesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FavoritesModule
  ]
}) export class FavoritesRoutingModule { }
