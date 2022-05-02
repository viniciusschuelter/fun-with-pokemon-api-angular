import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonDetailsComponent} from './pokemon-details.component';
import {SharedModule} from '../../modules/shared_modules/shared.module';
import {PokemonMoreDetailsModule} from '../../components/pokemon/pokemon-more-details/pokemon-more-details.module';


@NgModule({
  declarations: [PokemonDetailsComponent],
  exports: [PokemonDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    PokemonMoreDetailsModule
  ]
}) export class PokemonDetailsModule { }
