import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonMoreDetailsComponent } from './pokemon-more-details.component';
import { PokemonCauroselModule } from '../pokemon-caurosel/pokemon-caurosel.module';
import { ArrayFilterModule } from '../../../pipes/array-filter/array-filter.module';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { PokemonFavoriteButtonModule } from '../pokemon-favorite-button/pokemon-favorite-button.module';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';

@NgModule({
  declarations: [PokemonMoreDetailsComponent],
  exports: [PokemonMoreDetailsComponent],
  imports: [
    CommonModule,
    PokemonCauroselModule,
    PokemonTypeComponent,
    ArrayFilterModule,
    PokemonStatsComponent,
    PokemonFavoriteButtonModule
  ]
})
export class PokemonMoreDetailsModule {}
