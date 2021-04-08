import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Pokemon} from 'src/app/models/interfaces';
import {AuthService} from 'src/app/services/auth.service';
import {LocalStorageService} from 'src/app/services/local-storage.service';
import {PokemonService} from '../../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  isAuth$: Observable<string>;
  pokemons: Pokemon[] = [];
  character: Pokemon;
  isLoading = false;
  isError = '';
  isFetched = false;
  isNoData = false;
  uid: string;
  limit = 24;
  skip = 0;

  constructor(
    private pokemonService: PokemonService,
    private localService: LocalStorageService,
    private auth: AuthService,
    private store: Store<{ auth: string }>
  ) {
  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select('auth');
    this.getlocalComics();
  }

  private getlocalComics() {
    const myPokemons = this.localService.getItem('pokemons');
    this.pokemons = myPokemons;
    if (!myPokemons?.length) {
      this.fetchComics();
    }
  }

  public fetchComics() {
    this.isError = null;
    this.isLoading = true;
    this.pokemonService.getPokemons().subscribe(
      (list: any) => {
        console.log(list);
        this.pokemons = list;
        this.localService.setItem('pokemons', this.pokemons);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.isError = err;
        console.log(err);
      }
    );
  }

  public onSearchComic(pokemonsByTile: Pokemon[]) {
  }

  public onOrderComic(pokemonsByOrder: Pokemon[]) {
  }

  public onQuantityComic(pokemonsByQuantity: Pokemon[]) {
  }

  public onSingleCharacterSelected(selectedComic: {
    pokemonList: Pokemon[];
    pokemon: Pokemon;
  }) {
    this.pokemons = selectedComic.pokemonList;
    this.character = selectedComic.pokemon;
  }


  public onScroll() {
    this.skip += this.limit;
    this.pokemonService
      .getPokemonByLazyLoading(this.limit, this.skip)
      .subscribe((list: Pokemon[]) => {
        console.log(list);
        this.isFetched = true;
        this.pokemons = [...this.pokemons, ...list];
      });
  }
}
