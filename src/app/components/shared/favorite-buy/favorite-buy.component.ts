import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Pokemon} from 'src/app/models/interfaces';
import {FavoritesService} from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorite-buy',
  templateUrl: './favorite-buy.component.html',
  styleUrls: ['./favorite-buy.component.scss'],
})
export class FavoriteBuyComponent implements OnInit {


  @Input() pokemon: Pokemon;
  @Input() page: string;
  @Output() onFavClicked: EventEmitter<number> = new EventEmitter();

  isAuth$: Observable<string>;
  isAuth: boolean;
  isFavorite: boolean;

  constructor(
    private store: Store<{ auth: string }>,
    private favoriteService: FavoritesService
  ) {
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  public checkAuth() {
    this.isAuth$ = this.store.select('auth');
    this.isAuth$.subscribe(
      (uid) => {
        if (uid) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      },
      (err) => console.log(err)
    );
  }

  public onFavorite() {
    delete this.pokemon;
    const favoriteComic = {...this.pokemon, favorite_date: new Date()};
    this.favoriteService.addNewFavorite(favoriteComic).subscribe(() => {
      this.onFavClicked.emit(this.pokemon.id);
      this.isFavorite = true;
    });
  }
}
