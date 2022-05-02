import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonTypeComponent} from './pokemon-type.component';
import {SharedModule} from "../../../modules/shared_modules/shared.module";


@NgModule({
  declarations: [PokemonTypeComponent],
  exports: [PokemonTypeComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
}) export class PokemonTypeModule { }
