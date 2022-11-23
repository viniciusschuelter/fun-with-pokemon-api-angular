import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats.component';
import { SharedModule } from '../../../modules/shared_modules/shared.module';
import { RouterModule } from '@angular/router';
import { ArrayFilterModule } from '../../../pipes/array-filter/array-filter.module';
import { PokemonFavoriteButtonModule } from '../pokemon-favorite-button/pokemon-favorite-button.module';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';
import { AwesomeTooltipModule } from '../../../directives/tooltip/tooltip.module';
import { PokemonCarouselComponent } from '../pokemon-caurosel/pokemon-carousel.component';

@NgModule({
  declarations: [PokemonCardComponent],
  exports: [PokemonCardComponent],
  imports: [
    CommonModule,
    PokemonTypeComponent,
    PokemonStatsComponent,
    PokemonCarouselComponent,
    SharedModule,
    RouterModule,
    ArrayFilterModule,
    PokemonFavoriteButtonModule,
    AwesomeTooltipModule
  ]
})
export class PokemonCardModule {}
