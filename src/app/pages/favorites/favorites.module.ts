import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesComponent} from './favorites.component';
import {SharedModule} from '../../modules/shared_modules/shared.module';
import {PokemonCardModule} from '../../components/pokemon/pokemon-card/pokemon-card.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ArrayFilterModule} from '../../pipes/array-filter/array-filter.module';


@NgModule({
  declarations: [FavoritesComponent],
  exports: [FavoritesComponent],
  imports: [
    CommonModule,
    SharedModule,
    PokemonCardModule,
    DragDropModule,
    ArrayFilterModule,
  ]
}) export class FavoritesModule { }
