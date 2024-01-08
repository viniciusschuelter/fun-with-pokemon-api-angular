import { NgModule } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { SharedModule } from '../../../modules/shared_modules/shared.module';
import { RouterModule } from '@angular/router';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { AwesomeTooltipModule } from '../../../directives/tooltip/tooltip.module';
import { PokemonCarouselComponent } from '../pokemon-caurosel/pokemon-carousel.component';
import { PokemonFavoriteButtonComponent } from '../pokemon-favorite-button/pokemon-favorite-button.component';
import { ArrayFilterPipe } from '../../../pipes/array-filter/array-filter.pipe';
import { LoadingComponent } from '../../loading/loading.component';

@NgModule({
  declarations: [PokemonCardComponent],
  exports: [PokemonCardComponent],
  imports: [
    PokemonTypeComponent,
    PokemonStatsComponent,
    PokemonCarouselComponent,
    SharedModule,
    RouterModule,
    ArrayFilterPipe,
    LoadingComponent,
    AwesomeTooltipModule,
    PokemonFavoriteButtonComponent
  ]
})
export class PokemonCardModule {}
