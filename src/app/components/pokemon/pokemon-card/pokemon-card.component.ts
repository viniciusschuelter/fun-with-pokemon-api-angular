import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Pokemon, PokemonMini, PokemonSprites, SpritesTypes} from 'src/app/models/interfaces';
import {AuthService} from 'src/app/services/auth.service';
import {PokemonService} from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit, OnDestroy {

  _pokemon: Pokemon & PokemonMini;

  @Input()
  set pokemon(pokemon: Pokemon & PokemonMini) {
    this._pokemon = pokemon;
    this.getPokemonDetails();
  }

  get pokemon() {
    return this._pokemon;
  }

  @Input() page: string;
  isAuth$: Observable<string>;
  uid: string = null;
  isInit = true;
  isToast = false;
  subs: Subscription;
  isLoading = false;
  carouselCurr: SpritesTypes = 'front_default';
  carouselList: SpritesTypes[] = ['front_default', 'back_default', 'front_female', 'back_female', 'front_shiny', 'back_shiny', 'front_shiny_female', 'back_shiny_female'];

  constructor(
    private auth: AuthService,
    private store: Store<{ auth: string }>,
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit(): void {
    this.AuthListener();
    this.checkCreator();
  }

  private getPokemonDetails() {
    this.isLoading = true;
    this.subs = this.pokemonService.getPokemonByUrl(this.pokemon.url).subscribe(pokemon => {
      this.pokemon = pokemon;
      this.isLoading = false;
    });
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

  public onFavClicked(id: number) {
    if (id === this.pokemon.id) {
      this.isToast = true;
    }
  }

  public onCloseToast() {
    this.isToast = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }



  goToNextImg() {
    const index = this.carouselList.findIndex( item => item === this.carouselCurr);
    if (index === (this.carouselList.length - 1)) {
      this.carouselCurr = this.carouselList[0];
    } else {
      this.carouselCurr = this.carouselList[index + 1];
    }
    if (!this.pokemon.sprites[this.carouselCurr]) {
      this.goToNextImg();
    }
  }

  goToPrevImg() {
    const index = this.carouselList.findIndex( item => item === this.carouselCurr);
    if (index === 0) {
      this.carouselCurr = this.carouselList[this.carouselList.length - 1];
    } else {
      this.carouselCurr = this.carouselList[index - 1];
    }
    if (!this.pokemon.sprites[this.carouselCurr]) {
      this.goToPrevImg();
    }
  }
}
