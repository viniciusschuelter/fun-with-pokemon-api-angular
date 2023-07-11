import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { SharedModule } from '../../modules/shared_modules/shared.module';
import { PokemonCardModule } from '../../components/pokemon/pokemon-card/pokemon-card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [FavoritesComponent],
  exports: [FavoritesComponent],
  imports: [
    CommonModule,
    SharedModule,
    PokemonCardModule,
    DragDropModule
  ]
})
export class FavoritesModule {}
