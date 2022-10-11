import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonMini } from 'src/app/models/interfaces';
import { pokemonTypes, pokemonHabitats } from '../../mocks/pokemon-mock';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss']
})
export class FiltersBarComponent {
  @Output() searchChange: EventEmitter<string> = new EventEmitter();
  @Output() typePokemonChange: EventEmitter<string> = new EventEmitter();
  @Output() habitatPokemonChange: EventEmitter<string> = new EventEmitter();

  pokemonTypes: PokemonMini[] = pokemonTypes;
  pokemonHabitats: PokemonMini[] = pokemonHabitats;
  search = '';
}
