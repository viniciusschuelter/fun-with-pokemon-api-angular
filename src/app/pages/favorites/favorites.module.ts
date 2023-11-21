import { NgModule } from '@angular/core';
import { FavoritesComponent } from './favorites.component';
import { SharedModule } from '../../modules/shared_modules/shared.module';
import { PokemonCardModule } from '../../components/pokemon/pokemon-card/pokemon-card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [FavoritesComponent],
  exports: [FavoritesComponent],
  imports: [
    AsyncPipe,
    SharedModule,
    LoadingComponent,
    PokemonCardModule,
    DragDropModule
  ]
})
export class FavoritesModule {}
