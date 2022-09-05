import {Component} from '@angular/core';
import {Pokemon, PokemonMini} from 'src/app/models/interfaces';
import {FavoritesService} from 'src/app/services/favorites.service';
import {ToastrService} from 'ngx-toastr';
import {Observable, take, takeUntil} from 'rxjs';
import {map} from 'rxjs/operators';
import {PokemonAction} from '../../store/pokemon/pokemon.action';
import {Store} from '@ngrx/store';
import {selectFavoritesPokemons, selectMiniPokemons} from '../../store/pokemon/pokemon.selector';
import {UnsubscribeDirective} from '../../directives/unsubscribe/unsubscribe.directive';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent extends UnsubscribeDirective {
  myFavorites$: Observable<PokemonMini[]> = this.store.select(selectFavoritesPokemons).pipe();

  constructor(
    private favoritesService: FavoritesService,
    private toastr: ToastrService,
    private store: Store
  ) {
    super();
    this.initFavoritesPokemonsStore();
  }

  private initFavoritesPokemonsStore(): void {
    this.store.select(selectFavoritesPokemons).pipe(takeUntil(this._destroy)).subscribe( (results: any) => {
      console.log(results);
      if (!results?.length) {
        this.store.dispatch(PokemonAction.loadFavorites());
      }
    });
  }

  removeFromMyFavorites(pokemon: Pokemon) {
    this.favoritesService.removeFavorite(pokemon.id).pipe(
      take(1),
    ).subscribe( () => this.toastr.success('Now this pokemon is not your favorite', 'Success'));
  }
}
