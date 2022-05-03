import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { PokemonMini, } from 'src/app/models/interfaces';
import { ToastrService } from 'ngx-toastr';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
})
export class FiltersBarComponent implements OnInit {

  @Output() searchChange: EventEmitter<string> = new EventEmitter();
  @Output() typePokemonChange: EventEmitter<string> = new EventEmitter();
  @Output() habitatPokemonChange: EventEmitter<string> = new EventEmitter();

  pokemonTypes: PokemonMini[] = [];
  pokemonHabitats: PokemonMini[] = [];

  search = null;
  isError: string = null;

  constructor(
    private pokemonService: PokemonService,
    private toastr: ToastrService
  ) {
    this.fetchPokemonsType();
    this.fetchPokemonsHabitats();
  }

  ngOnInit(): void {
  }

  public onSearch() {
  }

  selectTypePokemon(value) {
    this.typePokemonChange.emit(value);
  }

  selectHabitatPokemon(value) {
    this.habitatPokemonChange.emit(value);
  }

  public fetchPokemonsType() {
    this.pokemonService.getPokemonByType().subscribe(
      (types) => {
        this.pokemonTypes = types;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }


  public fetchPokemonsHabitats() {
    this.pokemonService.getPokemonByHabitat().subscribe(
      (habitats) => {
        this.pokemonHabitats = habitats;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }
}
