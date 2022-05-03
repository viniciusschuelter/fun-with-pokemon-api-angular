import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Pokemon, PokemonTypesEnum} from 'src/app/models/interfaces';
import {AuthService} from 'src/app/services/auth.service';
import {LocalStorageService} from 'src/app/services/local-storage.service';
import {PokemonService} from '../../services/pokemon.service';
import {ToastrService} from 'ngx-toastr';

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
  limit = 20;
  skip = 0;
  activedFilters = false;
  myFavorites = this.localService.getItem('favorite')

  constructor(
    private pokemonService: PokemonService,
    private localService: LocalStorageService,
    private auth: AuthService,
    private store: Store<{ auth: string }>,
    private toastr: ToastrService,
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
      this.fetchPokemons();
    }
  }

  public fetchPokemons() {
    this.isError = null;
    this.isLoading = true;
    this.activedFilters = true;
    this.pokemonService.getPokemons().subscribe(
      (list: any) => {
        this.pokemons = list;
        this.localService.setItem('pokemons', this.pokemons);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.isError = err;
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  public fetchPokemonsByType(pokemonType: string) {
    this.isError = null;
    this.isLoading = true;
    this.activedFilters = !!pokemonType;
    this.pokemonService.getPokemonByType(pokemonType).subscribe(
      (list: any) => {
        this.pokemons = list;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.isError = err;
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  public fetchPokemonsByHabitat(pokemonHabitat: string) {
    this.isError = null;
    this.isLoading = true;
    this.activedFilters = !!pokemonHabitat;
    this.pokemonService.getPokemonByHabitat(pokemonHabitat).subscribe(
      (list: any) => {
        this.pokemons = list;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.isError = err;
        this.toastr.error(err.error.message, 'Error');
      }
    );
  }

  public onHabitatPokemonSelect(pokemonHabitat: string) {
    this.fetchPokemonsByHabitat(pokemonHabitat);
  }

  public onTypePokemonSelect(pokemonType: string) {
    this.fetchPokemonsByType(pokemonType);
  }



  public onSearchPokemon(term: string) {
    this.activedFilters = false;
  }

  public onScroll() {
    if (!this.activedFilters) {
      return;
    }
    this.skip += this.limit;
    this.pokemonService
      .getPokemonByLazyLoading(this.limit, this.skip)
      .subscribe((list: Pokemon[]) => {
        this.isFetched = true;
        this.pokemons = [...this.pokemons, ...list];
      });
  }

  addToMyFavorites(pokemon: Pokemon) {
    const index = this.myFavorites.findIndex(fav => fav.name === pokemon.name);
    if (index >= 0) {
      this.myFavorites.splice(index, 1);
      this.toastr.success('Now this pokemon is not your favorite', 'Success');
    } else {
      this.myFavorites = [...this.myFavorites, pokemon];
      this.toastr.success('Now this pokemon is your favorite', 'Success');
    }
    this.localService.setItem('favorite', this.myFavorites);
    this.myFavorites = [...this.myFavorites];
  }
}
