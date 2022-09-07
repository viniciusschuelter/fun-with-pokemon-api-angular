import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonMoreDetailsComponent} from './pokemon-more-details.component';
import {PokemonCauroselModule} from '../pokemon-caurosel/pokemon-caurosel.module';
import {PokemonTypeModule} from '../pokemon-type/pokemon-type.module';
import {ArrayFilterModule} from '../../../pipes/array-filter/array-filter.module';
import {PokemonStatsModule} from '../pokemon-stats/pokemon-stats.module';
import {PokemonFavoriteButtonModule} from '../pokemon-favorite-button/pokemon-favorite-button.module';


@NgModule({
  declarations: [PokemonMoreDetailsComponent],
  exports: [PokemonMoreDetailsComponent],
    imports: [
        CommonModule,
        PokemonCauroselModule,
        PokemonTypeModule,
        ArrayFilterModule,
        PokemonStatsModule,
        PokemonFavoriteButtonModule
    ]
}) export class PokemonMoreDetailsModule { }
