import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonSprites, SpritesTypes } from 'src/app/models/interfaces';
import slideLeft from '../../../animations/slideLeft.animation';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  standalone: true,
  host: { class: 'h-100' },
  selector: 'app-pokemon-carousel',
  templateUrl: './pokemon-carousel.component.html',
  styleUrls: ['./pokemon-carousel.component.scss'],
  imports: [CommonModule, LoadingComponent, NgOptimizedImage],
  animations: [slideLeft]
})
export class PokemonCarouselComponent implements OnChanges {
  @Input() pokemonSprites: PokemonSprites;
  loading = false;
  carouselCurr = 2;
  sprites = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pokemonSprites.firstChange) {
      this.sprites = this.extractSpritesFromObject(
        this.pokemonSprites,
        this.sprites,
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
      );
    }
  }

  extractSpritesFromObject = (obj, sprites, strSearch): string[] => {
    Object.keys(obj).forEach(key => {
      if (!obj[key]) return;
      if (typeof obj[key] === 'object')
        return this.extractSpritesFromObject(obj[key], sprites, strSearch);
      if (obj[key]?.includes(strSearch)) {
        sprites.push(obj[key]);
      }
    });
    return sprites;
  };

  changeImage(next = false): void {
    this.loading = true;
    next ? this.carouselCurr++ :  this.carouselCurr--;
    if (this.carouselCurr < 0) this.carouselCurr = this.sprites.length - 1;;
    if (this.carouselCurr >= this.sprites.length) this.carouselCurr = 0;
    setTimeout( () => this.loading = false, 50);
  }
}
