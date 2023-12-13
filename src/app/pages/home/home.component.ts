import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewChildren,
  WritableSignal
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, switchMap, takeUntil } from 'rxjs';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .homePage {
        min-height: 100vh;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends UnsubscribeDirective {
  $searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');
  isAuth$: Observable<string> = this.store.select('auth');

  myFavorites$: Observable<PokemonMini[]> = this.store
    .select(selectFavoritesPokemons)
    .pipe();

  pokemonsMini$: Observable<PokemonMini[]> = this.$searchTerm.pipe(
    switchMap(term => this.store
        .select(selectMiniPokemons)
        .pipe(
          map(
            _ => _?.length && _.filter(_ => _.name.includes(term.toLowerCase()))
          )
        )
    )
  );

  pokemons$: Observable<Record<string, Pokemon>> =
    this.pokemonDataService.entityMap$.pipe();

  @ViewChildren('itemsViewport') itemsViewport!: { _results: any };
  signalViewport: WritableSignal<{ [n: number]: boolean }> = signal({});
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
            return this.store.dispatch(
              PokemonAction.loadMiniSuccess({ data: pokemonsMini })
            );
          }
          this.store.dispatch(PokemonAction.loadPokemonMini());
        }
      });
  }
}
