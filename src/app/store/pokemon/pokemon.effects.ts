import {Injectable} from '@angular/core';
import {PokemonAction} from './pokemon.action';
import {PokemonService} from '../../services/pokemon.service';
import {FavoritesService} from '../../services/favorites.service';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {handleErrors} from '../../utils/utils';


@Injectable()
export class PokemonEffects {

  loadMiniPokemons$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PokemonAction.loadPokemonMini),
        switchMap( () => {
          console.log('here');
          return this.pokemonService.getPokemons().pipe(
            map(results => {
              return PokemonAction.loadMiniSuccess({data: results});
            })
          );
        }),
        catchError(handleErrors)
      );
    }
  );

  loadFavoritePokemons$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PokemonAction.loadFavorites),
        switchMap( () =>
          this.favoritesService.getAllFavorites().pipe(
            map(results => {
              return PokemonAction.loadFavoritesSuccess({data: results});
            })
          )),
        catchError(handleErrors)
      );
    }
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) {
  }

}
