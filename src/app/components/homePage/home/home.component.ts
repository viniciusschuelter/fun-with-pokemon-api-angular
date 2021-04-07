import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Character, Comic } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ComicsService } from 'src/app/services/comics.service';
import { FiltersServiceService } from 'src/app/services/filters-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyComicsService } from 'src/app/services/my-comics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuth$: Observable<string>;
  comics: Comic[] = [];
  character: Character;
  isLoading = false;
  isError = '';
  isFetched = false;
  isNoData = false;
  uid: string;
  isCreator: boolean;
  myComicsList: Comic[] = [];
  limit = 20;
  skip = 0;

  constructor(
    private comicsService: ComicsService,
    private localService: LocalStorageService,
    private auth: AuthService,
    private myComics: MyComicsService,
    private store: Store<{ auth: string }>,
    private filterService: FiltersServiceService
  ) {}

  ngOnInit(): void {
    this.auth.getCurrUserUid()
      ? (this.isCreator = true)
      : (this.isCreator = false);
    this.character = {
      id: null,
      image: null,
      name: null,
    };
    this.isAuth$ = this.store.select('auth');
    this.getlocalComics();
  }

  private getlocalComics() {
    const myComics = this.localService.getItem('comics');
    this.comics = myComics;
    if (myComics.length <= 0) {
      this.fetchComics();
    }
  }

  // ! fetch comics from Marvel API
  public fetchComics() {
    this.isError = null;
    this.isLoading = true;
    this.comicsService.getComics().subscribe(
      (list: any) => {
        this.comics = list;
        this.localService.setItem('comics', this.comics);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.isError = err;
        console.log(err);
      }
    );
  }

  public onSearchComic(comicsByTile: Comic[]) {
    if (comicsByTile.length > 0) {
      this.comics = comicsByTile;
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }

  public onOrderComic(comicsByOrder: Comic[]) {
    if (comicsByOrder.length > 0) {
      this.comics = comicsByOrder;
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }

  public onQuantityComic(comicsByQuantity: Comic[]) {
    if (comicsByQuantity.length > 0) {
      this.comics = [...comicsByQuantity, ...this.myComicsList];
      this.isNoData = false;
    } else {
      this.isNoData = true;
    }
  }

  public onSingleCharacterSelected(selectedComic: {
    character: Character;
    comics: Comic[];
  }) {
    this.comics = selectedComic.comics;
    this.character = selectedComic.character;
  }


  public onScroll() {
    this.skip += this.limit;
    this.filterService
      .getComicsByLazyLoading(this.limit, this.skip)
      .subscribe((comics: Comic[]) => {
        this.isFetched = true;
        this.comics = [...this.comics, ...comics];
      });
  }
}
