import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { Pokemon, PokemonMini } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';
import { PokemonAction } from '../../store/pokemon/pokemon.action';
import { PokemonState } from '../../store/pokemon/pokemon.reducer';
import {
  selectFavoritesPokemons,
  selectMiniPokemons
} from '../../store/pokemon/pokemon.selector';
import { UnsubscribeDirective } from '../../directives/unsubscribe/unsubscribe.directive';
import { PokemonDataService } from '../../store/pokemon/pokemon-data.service';
import {IntersectionStatus} from '../../directives/lazy-renderer/from-intersection-observer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscribeDirective {
  isAuth$: Observable<string> = this.store.select('auth');

  myFavorites$: Observable<PokemonMini[]> = this.store
    .select(selectFavoritesPokemons)
    .pipe();

  pokemonsMini$: Observable<PokemonMini[]> = this.store
    .select(selectMiniPokemons)
    .pipe();

  pokemons$: Observable<Record<string, Pokemon>> =
    this.pokemonDataService.entityMap$.pipe();


  visibilityStatus: {[key: string]: boolean} = {};
  searchTerm = '';

  constructor(
    private pokemonService: PokemonService,
    private pokemonDataService: PokemonDataService,
    private favoritesService: FavoritesService,
    private localService: LocalStorageService,
    private auth: AuthService,
    private store: Store<{ auth: string; pokemon: PokemonState }>
  ) {
    super();
    this.initPokemonStore();
  }

  private initPokemonStore(): void {
    this.store
      .select(selectMiniPokemons)
      .pipe(takeUntil(this._destroy))
      .subscribe((results: any) => {
        if (!results?.length) {
          const pokemonsMini = this.localService.getItem('miniPokemons');
          if (pokemonsMini?.length) {
            return this.store.dispatch(PokemonAction.loadMiniSuccess({ data: pokemonsMini }));
          }
          this.store.dispatch(PokemonAction.loadPokemonMini());
        }
      });
  }

  onVisibilityChanged(index: string, status: IntersectionStatus) {
    delete this.visibilityStatus[index];
    this.visibilityStatus[index] = status === 'Visible' || status === 'Pending';
  }
}
