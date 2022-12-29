import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonMini } from 'src/app/models/interfaces';
import { pokemonTypes, pokemonHabitats } from '../../mocks/pokemon-mock';
import { takeUntil } from 'rxjs';
import { PokemonAction } from '../../store/pokemon/pokemon.action';
import { UnsubscribeDirective } from '../../directives/unsubscribe/unsubscribe.directive';
import { PokemonService } from '../../services/pokemon.service';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../store/pokemon/pokemon.reducer';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent extends UnsubscribeDirective {
  @Output() searchChange: EventEmitter<string> = new EventEmitter();
  @Output() typePokemonChange: EventEmitter<string> = new EventEmitter();
  @Output() habitatPokemonChange: EventEmitter<string> = new EventEmitter();

  pokemonTypes: PokemonMini[] = pokemonTypes;
  pokemonHabitats: PokemonMini[] = pokemonHabitats;
  search = '';

  constructor(
    private pokemonService: PokemonService,
    private store: Store<{ auth: string; pokemon: PokemonState }>
  ) {
    super();
  }

  pokemonsByHabitats(habitat): void {
    this.pokemonService
      .getPokemonByHabitat(habitat)
      .pipe(takeUntil(this._destroy))
      .subscribe((pokemonsMini: PokemonMini[]) => this.store.dispatch(
          PokemonAction.loadMiniSuccess({ data: pokemonsMini })
        )
      );
  }

  pokemonsByTypes(type): void {
    this.pokemonService
      .getPokemonByType(type)
      .pipe(takeUntil(this._destroy))
      .subscribe((pokemonsMini: PokemonMini[]) => this.store.dispatch(
          PokemonAction.loadMiniSuccess({ data: pokemonsMini })
        )
      );
  }
}
