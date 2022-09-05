import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FavoritesComponent} from './favorites.component';
import {FavoritesModule} from './favorites.module';
import {StoreModule} from '@ngrx/store';
import {PokemonReducer} from '../../store/pokemon/pokemon.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PokemonEffects} from '../../store/pokemon/pokemon.effects';


const routes: Route[] = [
  {
    path: '',
    component: FavoritesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('pokemon', PokemonReducer),
    EffectsModule.forFeature([PokemonEffects]),
    FavoritesModule
  ]
}) export class FavoritesRoutingModule { }
