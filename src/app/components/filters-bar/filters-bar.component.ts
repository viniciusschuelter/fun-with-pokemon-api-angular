import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { PokemonMini } from 'src/app/models/interfaces';
import { pokemonHabitats, pokemonTypes } from '../../mocks/pokemon-mock';
import { debounce, interval, takeUntil } from 'rxjs';
import { PokemonAction } from '../../store/pokemon/pokemon.action';
import { UnsubscribeDirective } from '../../directives/unsubscribe/unsubscribe.directive';
import { PokemonService } from '../../services/pokemon.service';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../store/pokemon/pokemon.reducer';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  imports: [FormsModule, NgFor],
  styles: [
    `
      :host {
        .input-group-append {
          :first-child {
            border-radius: unset;
          }
          :last-child {
            border-radius: 0 0.25rem 0.25rem 0;
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      .pipe(
        debounce(() => interval(100)),
        takeUntil(this._destroy)
      )
      .subscribe((pokemonsMini: PokemonMini[]) => this.store.dispatch(
          PokemonAction.loadMiniSuccess({ data: pokemonsMini })
        )
      );
  }

  pokemonsByTypes(type): void {
    this.pokemonService
      .getPokemonByType(type)
      .pipe(
        debounce(() => interval(100)),
        takeUntil(this._destroy)
      )
      .subscribe((pokemonsMini: PokemonMini[]) => this.store.dispatch(
          PokemonAction.loadMiniSuccess({ data: pokemonsMini })
        )
      );
  }
}
