import { Component } from '@angular/core';
import { Pokemon, PokemonMini } from 'src/app/models/interfaces';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { PokemonAction } from '../../store/pokemon/pokemon.action';
import { Store } from '@ngrx/store';
import { selectFavoritesPokemons } from '../../store/pokemon/pokemon.selector';
import { UnsubscribeDirective } from '../../directives/unsubscribe/unsubscribe.directive';
import { PokemonDataService } from '../../store/pokemon/pokemon-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent extends UnsubscribeDirective {
  myFavorites$: Observable<PokemonMini[]> = this.store
    .select(selectFavoritesPokemons)
    .pipe();
  pokemons$: Observable<Record<string, Pokemon>> =
    this.pokemonDataService.entityMap$.pipe();

  constructor(
    private favoritesService: FavoritesService,
    private pokemonDataService: PokemonDataService,
    private toastr: ToastrService,
    private store: Store
  ) {
    super();
    this.initFavoritesPokemonsStore();
  }

  private async initFavoritesPokemonsStore(): Promise<void> {
    if (!(await firstValueFrom(this.myFavorites$))) {
      this.store.dispatch(PokemonAction.loadFavorites());
    }
  }
}
