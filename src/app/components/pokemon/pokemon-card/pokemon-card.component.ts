import {Component, EventEmitter, Input, Output} from '@angular/core';
import {takeUntil} from 'rxjs';
import {Pokemon, PokemonMini} from 'src/app/models/interfaces';
import {PokemonService} from '../../../services/pokemon.service';
import {UnsubscribeDirective} from '../../../directives/unsubscribe/unsubscribe.directive';
import {PokemonDataService} from '../../../store/pokemon/pokemon-data.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent extends UnsubscribeDirective {

  _pokemon: Pokemon & PokemonMini;

  @Input()
  set pokemon(pokemon: Pokemon & PokemonMini) {
    if (!pokemon.id) {
      this.getPokemonDetails(pokemon);
    }
    this._pokemon = pokemon;
  }

  get pokemon() {
    return this._pokemon;
  }

  @Input() myFavorites: PokemonMini[];
  @Output() clickOnFavorite: EventEmitter<Pokemon> = new EventEmitter();

  constructor(
    private pokemonDataService: PokemonDataService,
    private pokemonService: PokemonService
  ) {
    super();
  }

  private getPokemonDetails(pokemon: PokemonMini) {
    this.pokemonService.getPokemonByName(pokemon.name)
      .pipe(takeUntil(this._destroy))
      .subscribe((data: Pokemon) => this.pokemonDataService.addOnePokemon(data));
  }

  trackBy(index: number, item: PokemonMini): string {
    return item.url;
  }
}
