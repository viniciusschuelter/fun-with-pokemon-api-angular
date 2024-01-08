import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PokemonSprites } from 'src/app/models/interfaces';
import slideLeft from '../../../animations/slideLeft.animation';
import { NgOptimizedImage } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  standalone: true,
  host: { class: 'h-100' },
  selector: 'app-pokemon-carousel',
  templateUrl: './pokemon-carousel.component.html',
  styleUrls: ['./pokemon-carousel.component.scss'],
  imports: [LoadingComponent, NgOptimizedImage],
  animations: [slideLeft],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCarouselComponent implements OnChanges {
  @Input() pokemonSprites: PokemonSprites;
  loading = false;
  carouselCurr = 2;
  sprites = [];
  spriteDefault = 'official-artwork';
  blackListSprites = [
    'generation-i',
    'generation-ii',
    'generation-iii',
    'generation-iv',
  ];

  constructor(private _cdRef: ChangeDetectorRef) {}

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
    Object.keys(obj).forEach((key: any) => {
      if (!obj[key]) return;
      if (typeof obj[key] === 'object') {
        if (this.blackListSprites.includes(key)) return;
        if (key === this.spriteDefault) this.carouselCurr = sprites.length;
        return this.extractSpritesFromObject(obj[key], sprites, strSearch);
      }
      if (obj[key]?.includes(strSearch) && !key.includes('back_')) {
        sprites.push(obj[key]);
      }
    });
    return sprites;
  };

  changeImage(next = false): void {
    this.loading = true;
    next ? this.carouselCurr++ : this.carouselCurr--;
    if (this.carouselCurr < 0) this.carouselCurr = this.sprites.length - 1;
    if (this.carouselCurr >= this.sprites.length) this.carouselCurr = 0;
    setTimeout(() => {
      this.loading = false;
      this._cdRef.detectChanges();
    }, 50);
  }
}
