import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared_modules/shared.module';
import { PokemonCardModule } from '../../components/pokemon/pokemon-card/pokemon-card.module';
import { ArrayFilterModule } from '../../pipes/array-filter/array-filter.module';
import { FiltersBarModule } from '../../components/filters-bar/filters-bar.module';
import { LazyRendererModule } from '../../directives/lazy-renderer/lazy-renderer.module';
import { FilterModule } from '../../pipes/filter';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    PokemonCardModule,
    ArrayFilterModule,
    FiltersBarModule,
    LazyRendererModule,
    FilterModule
  ]
})
export class HomeModule {}
