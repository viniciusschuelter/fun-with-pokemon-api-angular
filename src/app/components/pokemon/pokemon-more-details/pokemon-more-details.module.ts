import { NgModule } from '@angular/core';
import { PokemonMoreDetailsComponent } from './pokemon-more-details.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { PokemonCarouselComponent } from '../pokemon-caurosel/pokemon-carousel.component';
import { PokemonFavoriteButtonComponent } from '../pokemon-favorite-button/pokemon-favorite-button.component';
import { ArrayFilterPipe } from '../../../pipes/array-filter/array-filter.pipe';

@NgModule({
  declarations: [PokemonMoreDetailsComponent],
  exports: [PokemonMoreDetailsComponent],
  imports: [
    PokemonTypeComponent,
    PokemonCarouselComponent,
    ArrayFilterPipe,
    PokemonStatsComponent,
    PokemonFavoriteButtonComponent
  ]
})
export class PokemonMoreDetailsModule {}
