import { createAction, props } from '@ngrx/store';
import { Pokemon, PokemonMini } from '../../models/interfaces';

export const PokemonAction = {
  loadPokemonMini: createAction('[Pokemon] Load Pokemons Mini'),
  loadMiniSuccess: createAction(
    '[Pokemon] Load Pokemons Mini Success',
    props<{
      data: PokemonMini[];
    }>()
  ),
  loadMiniFailure: createAction(
    '[Pokemon] Load Pokemon Mini Failure',
    props<{ error: any }>()
  ),
  loadPokemon: createAction(
    '[Pokemon] Load Pokemons',
    props<{ name: string }>()
  ),
  loadSuccess: createAction(
    '[Pokemon] Load Pokemons Success',
    props<{
      data: Pokemon[];
    }>()
  ),
  loadFailure: createAction(
    '[Pokemon] Load Pokemon Failure',
    props<{ error: any }>()
  ),
  loadFavorites: createAction('[Pokemon] Load Pokemons Favorites'),
  loadFavoritesSuccess: createAction(
    '[Pokemon] Load Pokemons Favorites Success',
    props<{
      data: PokemonMini[];
    }>()
  ),
  loadFavoritesFailure: createAction(
    '[Pokemon] Load Pokemon Favorites Failure',
    props<{ error: any }>()
  )
};
