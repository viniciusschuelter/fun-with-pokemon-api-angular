import {Component, OnInit} from '@angular/core';
import {Pokemon} from 'src/app/models/interfaces';
import {FavoritesService} from 'src/app/services/favorites.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {LocalStorageService} from '../../services/local-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  pokemons: Pokemon[] = [];
  isLoading = false;
  isError: string = null;
  myFavorites = this.localService.getItem('favorite');

  constructor(
    private favoritesService: FavoritesService,
    private localService: LocalStorageService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getAllFavorites();
  }

  public getAllFavorites() {
    this.isError = null;
    this.isLoading = true;
    this.pokemons = this.myFavorites.sort(
      (a, b) =>
        new Date(b?.favorite_date).getTime() -
        new Date(a?.favorite_date).getTime()
    );
    this.isLoading = false;
    // this.favoritesService.getAllFavorites().subscribe(
    //   (pokemons: Pokemon[]) => {
    //     const temporary = pokemons;
    //     const filtredFavorites = pokemons.filter((pokemon) => {
    //       for (const item of temporary) {
    //         return pokemon.id !== item.id;
    //       }
    //     });
    //     this.pokemons = filtredFavorites.sort(
    //       (a, b) =>
    //         new Date(b?.favorite_date).getTime() -
    //         new Date(a?.favorite_date).getTime()
    //     );
    //     this.isLoading = false;
    //   },
    //   (err) => {
    //     this.isLoading = false;
    //     this.isError = err;
    //     console.log(err);
    //   }
    // );
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pokemons, event.previousIndex, event.currentIndex);
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
  }
}
