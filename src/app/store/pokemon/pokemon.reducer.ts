import {createReducer, on, Action} from '@ngrx/store';
import {PokemonAction} from './pokemon.action';
import {Pokemon, PokemonMini} from '../../models/interfaces';

export interface PokemonState {
  loading: boolean;
  miniPokemons: PokemonMini[];
  pokemons: Pokemon[];
  favorites: PokemonMini[];
}

const initialState: PokemonState = {
  loading: true,
  miniPokemons: [],
  pokemons: [],
  favorites: null,
};


const newPokemonReducer = createReducer(
  initialState,
  on(PokemonAction.loadPokemonMini, (state, action) => ({...state, loading: true})),
  on(PokemonAction.loadMiniSuccess, (state, action) => ({...state, loading: false, miniPokemons: action.data})),
  on(PokemonAction.loadMiniFailure, (state, uid) => state),
  on(PokemonAction.loadPokemon, (state, action) => ({...state, loading: true})),
  on(PokemonAction.loadSuccess, (state, action) => {
console.log(state.pokemons);
    return ({...state, loading: false, pokemons: [...state.pokemons || [], ...action.data]})
    }),
  on(PokemonAction.loadFailure, (state, uid) => state),
  on(PokemonAction.loadFavorites, (state, action) => ({...state, loading: true})),
  on(PokemonAction.loadFavoritesSuccess, (state, action) => ({...state, loading: false, favorites: action.data})),
  on(PokemonAction.loadFavoritesFailure, (state, uid) => state)
);

export function PokemonReducer(state = initialState, action: Action) {
  return newPokemonReducer(state, action);
}
