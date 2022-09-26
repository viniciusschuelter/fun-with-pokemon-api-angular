import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonDetailsModule } from './pokemon-details.module';

const routes: Route[] = [
  {
    path: '',
    component: PokemonDetailsComponent
  }
];

@NgModule({imports: [RouterModule.forChild(routes), PokemonDetailsModule]})
export class PokemonDetailsRoutingModule {}
