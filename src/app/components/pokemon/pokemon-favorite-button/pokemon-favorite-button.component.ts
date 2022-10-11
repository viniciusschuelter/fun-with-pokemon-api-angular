import { Component, Input } from '@angular/core';
import { Pokemon, PokemonMini } from 'src/app/models/interfaces';
import { takeUntil } from 'rxjs';
import { PokemonAction } from '../../../store/pokemon/pokemon.action';
import { UnsubscribeDirective } from '../../../directives/unsubscribe/unsubscribe.directive';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../../../services/favorites.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pokemon-favorite-button',
  template: `
    <a
      class="btn btn-sm ms-3"
      [awesomeTooltip]="isFavorite ? 'Remove from favorites':  'Add to favorites'"
      [ngClass]="isFavorite ? 'btn-danger':  'btn-outline-danger'"
      (click)="clickFavorite()"
    >
      <i class="fa fa-heart-o mt-1 mx-2"></i>
    </a>
  `
})
export class PokemonFavoriteButtonComponent extends UnsubscribeDirective {
  @Input() myFavorites: PokemonMini[];
  @Input() pokemon: Pokemon & PokemonMini;
  @Input() isFavorite: boolean;
  uid: string = this.auth.getCurrUserUid();

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private store: Store<{ auth: string }>,
    private favoritesService: FavoritesService,
    private localService: LocalStorageService,
    private router: Router
  ) {
    super();
  }

  clickFavorite() {
    console.log('here');
    if (this.uid) {
      this.isFavorite ? this.removeFromFavorites() : this.addToFavorites()
    } else {
      this.router.navigate(['/soon']);
    }
  }

  addToFavorites(): void {
    this.favoritesService
      .addNewFavorite(this.pokemon)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.store.dispatch(
          PokemonAction.loadFavoritesSuccess({data: [...this.myFavorites, this.pokemon]})
        );
        this.toastr.success(
          `The ${this.pokemon.name} is now your favorite`,
          'Success'
        );
      });
  }

  removeFromFavorites(): void {
    this.favoritesService
      .removeFavorite(this.pokemon.id)
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.myFavorites = this.myFavorites.filter(
          _ => _.name !== this.pokemon.name
        );
        this.store.dispatch(
          PokemonAction.loadFavoritesSuccess({ data: this.myFavorites })
        );
        this.toastr.success(
          `The ${this.pokemon.name} isn't your favorite anymore`,
          'Success'
        );
      });
  }
}
