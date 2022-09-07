import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonFavoriteButtonComponent} from './pokemon-favorite-button.component';
import {ArrayFilterModule} from '../../../pipes/array-filter/array-filter.module';


@NgModule({
  declarations: [PokemonFavoriteButtonComponent],
  exports: [PokemonFavoriteButtonComponent],
  imports: [
    CommonModule,
    ArrayFilterModule
  ]
}) export class PokemonFavoriteButtonModule { }
