import {Injectable} from '@angular/core';
import {PokemonAction} from './pokemon.action';
import {PokemonService} from '../../services/pokemon.service';
import {FavoritesService} from '../../services/favorites.service';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {handleErrors} from '../../utils/utils';
import {PokemonDataService} from './pokemon-data.service';
import {firstValueFrom, Observable} from 'rxjs';


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

  loadPokemon$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(PokemonAction.loadPokemon),
        switchMap(({ name }) => {
          console.log('here');
          return this.pokemonService.getPokemonByName(name).pipe(
            map(pokemon => {
              this.pokemonDataService.addOneToCache(pokemon);
              return PokemonAction.loadSuccess({data: [pokemon]});
            })
          );
        }),
        catchError(handleErrors)
      );
    }
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private pokemonDataService: PokemonDataService,
    private favoritesService: FavoritesService
  ) {
  }

}
