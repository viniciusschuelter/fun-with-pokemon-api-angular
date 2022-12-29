import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonMoreDetailsComponent } from './pokemon-more-details.component';
import { ArrayFilterModule } from '../../../pipes/array-filter/array-filter.module';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { PokemonCarouselComponent } from '../pokemon-caurosel/pokemon-carousel.component';
import {PokemonFavoriteButtonComponent} from '../pokemon-favorite-button/pokemon-favorite-button.component';

@NgModule({
  declarations: [PokemonMoreDetailsComponent],
  exports: [PokemonMoreDetailsComponent],
  imports: [
    CommonModule,
    PokemonTypeComponent,
    PokemonCarouselComponent,
    ArrayFilterModule,
    PokemonStatsComponent,
    PokemonFavoriteButtonComponent
  ]
})
export class PokemonMoreDetailsModule {}
