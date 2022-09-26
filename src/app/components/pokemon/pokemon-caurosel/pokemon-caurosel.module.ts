import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCarouselComponent } from './pokemon-carousel.component';

@NgModule({
  declarations: [PokemonCarouselComponent],
  exports: [PokemonCarouselComponent],
  imports: [CommonModule]
})
export class PokemonCauroselModule {}
