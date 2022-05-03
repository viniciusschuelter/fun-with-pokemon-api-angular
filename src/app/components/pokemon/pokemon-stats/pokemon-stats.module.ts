import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonStatsComponent} from './pokemon-stats.component';


@NgModule({
  declarations: [PokemonStatsComponent],
  exports: [PokemonStatsComponent],
  imports: [
    CommonModule
  ]
}) export class PokemonStatsModule { }
