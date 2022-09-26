import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { HomeModule } from './home.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PokemonEffects } from '../../store/pokemon/pokemon.effects';
import { PokemonReducer } from '../../store/pokemon/pokemon.reducer';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('pokemon', PokemonReducer),
    EffectsModule.forFeature([PokemonEffects]),
    HomeModule
  ]
})
export class HomeRoutingModule {}
