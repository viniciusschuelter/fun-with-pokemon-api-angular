import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PokemonState} from './pokemon.reducer';


export const selectProjectViewState = createFeatureSelector<
  PokemonState
  >('pokemon');

export const selectLoading = createSelector(
  selectProjectViewState,
  (state: PokemonState) => state?.loading
);


export const selectMiniPokemons = createSelector(
  selectProjectViewState,
  (state: PokemonState) => state?.miniPokemons
);


export const selectPokemons = createSelector(
  selectProjectViewState,
  (state: PokemonState) => state?.pokemons
);

export const selectFavoritesPokemons = createSelector(
  selectProjectViewState,
  (state: PokemonState) => state?.favorites
);
