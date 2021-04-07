import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Pokemon} from 'src/app/models/interfaces';
import {PokemonService} from "../../../services/pokemon.service";

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
})
export class FiltersBarComponent implements OnInit {

  @Output() onSearchComic: EventEmitter<string> = new EventEmitter();
  @Output() onOrderComic: EventEmitter<Pokemon[]> = new EventEmitter();
  @Output() onQuantityComic: EventEmitter<Pokemon[]> = new EventEmitter();
  @Output()
  onSingleCharacterSelected: EventEmitter<object> = new EventEmitter();

  @Input() pokemonList: Pokemon[];

  pokemons: Pokemon[];
  selectedChar: Pokemon | any;
  isSelected = false;
  isClicked = false;
  search = null;
  isError: string = null;
  limit = 20;
  skip = 0;

  constructor(
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit(): void {
  }

  public onSearch() {
  }

  public onCharacterClicked() {
    this.isClicked = !this.isClicked;
  }

  public onCharacterSelected(id: number) {
    this.isClicked = false;
    this.isSelected = true;
    this.selectedCharacter(id);
  }

  public selectedCharacter(id: number) {
    this.selectedChar = this.pokemons.filter((char) => {
      return char.id === id;
    });
  }

  public onOrderBy(selected: string) {
    switch (selected) {
      case 'title':
        this.pokemonList = this.pokemonList.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        this.onOrderComic.emit(this.pokemonList);
        break;

      // case '-onsaleDate':
      //   this.pokemonList = this.pokemonList.sort(
      //     (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      //   );
      //   this.onOrderComic.emit(this.pokemonList);
      //   break;
      //
      // case 'priceInc':
      //   this.pokemonList = this.pokemonList.sort((a, b) => a.price - b.price);
      //   this.onOrderComic.emit(this.pokemonList);
      //   break;
      //
      // case 'priceDesc':
      //   this.pokemonList = this.pokemonList.sort((a, b) => b.price - a.price);
      //   this.onOrderComic.emit(this.pokemonList);
      //   break;
      default: return;
    }
  }

  public onQuantity(quantity: number) {
  }

  public onScroll() {
    this.skip += this.limit;
    this.pokemonService
      .getPokemonByLazyLoading(this.limit, this.skip)
      .subscribe(
        (chars: any) => {
          this.pokemons = [...this.pokemons, ...chars];
        },
        (err) => (this.isError = err)
      );
  }
}
