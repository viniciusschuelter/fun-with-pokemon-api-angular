import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Pokemon, PokemonMini} from 'src/app/models/interfaces';
import {AuthService} from 'src/app/services/auth.service';
import {PokemonService} from '../../../services/pokemon.service';
import {FavoritesService} from '../../../services/favorites.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit, OnDestroy {

  _pokemon: Pokemon & PokemonMini;

  @Input()
  set pokemon(pokemon: Pokemon & PokemonMini) {
    if (pokemon.url) {
      pokemon.url = pokemon.url.replace('-species', '');
      this.url = pokemon.url;
    }
    this._pokemon = pokemon;
    this.getPokemonDetails();
  }

  get pokemon() {
    return this._pokemon;
  }

  @Input() page: string;
  @Input() favorite = false;
  @Output() clickOnFavorite: EventEmitter<Pokemon> = new EventEmitter();
  isAuth$: Observable<string>;
  uid: string = null;
  isInit = true;
  isToast = false;
  subs: Subscription;
  isLoading = false;
  url = '';

  constructor(
    private auth: AuthService,
    private store: Store<{ auth: string }>,
    private pokemonService: PokemonService,
    private toastr: ToastrService,
    private favoriteService: FavoritesService,
    private localService: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.AuthListener();
    this.checkCreator();
  }

  private getPokemonDetails() {
    if (this.pokemon.url) {
      this.isLoading = true;
      this.subs = this.pokemonService.getPokemonByUrl(this.pokemon.url).subscribe(pokemon => {
        this.pokemon = pokemon;
        this.isLoading = false;
      });
    }
  }

  public checkCreator() {
    this.uid = this.auth.getCurrUserUid();
  }

  public AuthListener() {
    this.isAuth$ = this.store.select('auth');
    this.isAuth$.subscribe((id: string) => {
      if (id) {
        this.isInit = false;
      } else {
        this.isInit = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  clickFavorite() {
    if (this.uid) {
      const favoritePokemon = {...this.pokemon, favorite_date: new Date()};
      this.clickOnFavorite.emit(favoritePokemon);
      // this.favoriteService.addNewFavorite(favoritePokemon).subscribe(() => {
      // });
    } else {
      this.router.navigate(['/soon']);
    }
  }

  trackBy(index: number, item: PokemonMini): string {
    return item.url;
  }
}
