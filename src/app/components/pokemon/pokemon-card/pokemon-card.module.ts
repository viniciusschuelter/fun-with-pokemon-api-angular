import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonCardComponent} from './pokemon-card.component';
import {PokemonCauroselModule} from '../pokemon-caurosel/pokemon-caurosel.module';
import {PokemonTypeModule} from '../pokemon-type/pokemon-type.module';
import {PokemonStatsModule} from '../pokemon-stats/pokemon-stats.module';
import {SharedModule} from '../../../modules/shared_modules/shared.module';
import {RouterModule} from '@angular/router';
import {ArrayFilterModule} from '../../../pipes/array-filter/array-filter.module';
import {PokemonFavoriteButtonModule} from '../pokemon-favorite-button/pokemon-favorite-button.module';


@NgModule({
  declarations: [PokemonCardComponent],
  exports: [PokemonCardComponent],
  imports: [
    CommonModule,
    PokemonCauroselModule,
    PokemonTypeModule,
    PokemonStatsModule,
    SharedModule,
    RouterModule,
    ArrayFilterModule,
    PokemonFavoriteButtonModule
  ]
}) export class PokemonCardModule { }
