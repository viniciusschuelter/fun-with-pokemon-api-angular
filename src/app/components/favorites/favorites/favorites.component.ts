import {Component, OnInit} from '@angular/core';
import {Pokemon} from 'src/app/models/interfaces';
import {FavoritesService} from 'src/app/services/favorites.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  pokemons: Pokemon[] = [];
  isLoading = false;
  isError: string = null;

  constructor(
    private favoritesService: FavoritesService,
    private localService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.getAllFavorites();
  }

  public getAllFavorites() {
    this.isError = null;
    this.isLoading = true;
    const myFavorites = this.localService.getItem('favorite');
    this.pokemons = myFavorites.sort(
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
}
