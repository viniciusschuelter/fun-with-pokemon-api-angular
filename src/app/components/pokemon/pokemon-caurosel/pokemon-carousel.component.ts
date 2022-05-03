import {Component, Input, OnInit} from '@angular/core';
import {PokemonSprites, SpritesTypes} from 'src/app/models/interfaces';
import slideLeft from '../../../animations/slideLeft.animation';

@Component({
  selector: 'app-pokemon-carousel',
  templateUrl: './pokemon-carousel.component.html',
  styleUrls: ['./pokemon-carousel.component.scss'],
  animations: [slideLeft]
})
export class PokemonCarouselComponent implements OnInit {

  @Input() pokemonSprites: PokemonSprites;
  carouselCurr: SpritesTypes = 'front_default';
  carouselList: SpritesTypes[] = ['front_default', 'back_default', 'front_female', 'back_female', 'front_shiny', 'back_shiny', 'front_shiny_female', 'back_shiny_female'];

  constructor() {
  }

  ngOnInit(): void {
  }

  goToNextImg() {
    const index = this.carouselList.findIndex(item => item === this.carouselCurr);
    if (index === (this.carouselList.length - 1)) {
      this.carouselCurr = this.carouselList[0];
    } else {
      this.carouselCurr = this.carouselList[index + 1];
    }
    if (!this.pokemonSprites[this.carouselCurr]) {
      this.goToNextImg();
    }
  }

  goToPrevImg() {
    const index = this.carouselList.findIndex(item => item === this.carouselCurr);
    if (index === 0) {
      this.carouselCurr = this.carouselList[this.carouselList.length - 1];
    } else {
      this.carouselCurr = this.carouselList[index - 1];
    }
    if (!this.pokemonSprites[this.carouselCurr]) {
      this.goToPrevImg();
    }
  }
}
