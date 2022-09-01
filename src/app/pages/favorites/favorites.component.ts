import {Component} from '@angular/core';
import {Pokemon} from 'src/app/models/interfaces';
import {FavoritesService} from 'src/app/services/favorites.service';
import {ToastrService} from 'ngx-toastr';
import {Observable, take} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  myFavorites$: Observable<Pokemon[]> = this.favoritesService.getAllFavorites().pipe(
    take(1),
    map( favorites => favorites.sort(
    (a, b) => new Date(b?.favorite_date).getTime() - new Date(a?.favorite_date).getTime()
  )));

  constructor(
    private favoritesService: FavoritesService,
    private toastr: ToastrService
  ) {
  }

  removeFromMyFavorites(pokemon: Pokemon) {
    this.favoritesService.removeFavorite(pokemon.id).pipe(
      take(1),
    ).subscribe( () => this.toastr.success('Now this pokemon is not your favorite', 'Success'));
  }
}
