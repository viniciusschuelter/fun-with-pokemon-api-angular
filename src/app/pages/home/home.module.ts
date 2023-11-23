import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../modules/shared_modules/shared.module';
import { PokemonCardModule } from '../../components/pokemon/pokemon-card/pokemon-card.module';
import { FiltersBarComponent } from '../../components/filters-bar/filters-bar.component';
import { LazyRendererDirective } from '../../directives/lazy-renderer/lazy-renderer.directive';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {LoadingComponent} from '../../components/loading/loading.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    SharedModule,
    LoadingComponent,
    PokemonCardModule,
    FiltersBarComponent,
    LazyRendererDirective,
    FilterPipe
  ]
})
export class HomeModule {}
