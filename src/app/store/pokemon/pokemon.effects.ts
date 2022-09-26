import { Injectable } from '@angular/core';
import { PokemonAction } from './pokemon.action';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { handleErrors } from '../../utils/utils';
import { PokemonDataService } from './pokemon-data.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Injectable()
export class PokemonEffects {
  loadMiniPokemons$ = createEffect(() => this.actions$.pipe(
      ofType(PokemonAction.loadPokemonMini),
      switchMap(() => this.pokemonService
          .getPokemons()
          .pipe(
            map(results => {
              this.localService.setItem('miniPokemons', results);
              return PokemonAction.loadMiniSuccess({ data: results })
            })
          )),
      catchError(handleErrors)
    )
  );

  loadFavoritePokemons$ = createEffect(() => this.actions$.pipe(
      ofType(PokemonAction.loadFavorites),
      switchMap(() => this.favoritesService
          .getAllFavorites()
          .pipe(
            map(results => PokemonAction.loadFavoritesSuccess({ data: results })
            )
          )
      ),
      catchError(handleErrors)
    )
  );

  loadPokemon$ = createEffect(() => this.actions$.pipe(
      ofType(PokemonAction.loadPokemon),
      switchMap(({ name }) => this.pokemonService.getPokemonByName(name).pipe(
          map(pokemon => {
            this.pokemonDataService.addOneToCache(pokemon);
            return PokemonAction.loadSuccess({ data: [pokemon] });
          })
        )),
      catchError(handleErrors)
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private localService: LocalStorageService,
    private pokemonDataService: PokemonDataService,
    private favoritesService: FavoritesService
  ) {}
}
