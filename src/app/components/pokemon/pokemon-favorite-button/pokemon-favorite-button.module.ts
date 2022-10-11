import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonFavoriteButtonComponent } from './pokemon-favorite-button.component';
import { ArrayFilterModule } from '../../../pipes/array-filter/array-filter.module';
import {AwesomeTooltipModule} from '../../../directives/tooltip/tooltip.module';

@NgModule({
  declarations: [PokemonFavoriteButtonComponent],
  exports: [PokemonFavoriteButtonComponent],
    imports: [CommonModule, ArrayFilterModule, AwesomeTooltipModule]
})
export class PokemonFavoriteButtonModule {}
