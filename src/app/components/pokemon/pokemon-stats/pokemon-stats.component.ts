import {Component, Input, OnInit} from '@angular/core';
import {Pokemon, PokemonMini, PokemonStat, SpritesTypes} from 'src/app/models/interfaces';

@Component({
  selector: 'app-pokemon-stats',
  template: `
    <div class="d-flex align-items-center" *ngFor="let item of pokemonStats">
      <span class="label stats pr-2">{{statsLabel[item.stat?.name] | uppercase}}</span>
      <div class="progress m-2 w-100">
        <div class="progress-bar {{item.stat?.name}}"
             [style.width]="(item?.base_stat * 0.65) + '%'"
        ></div>
      </div>
      <span class="label number">{{item?.base_stat}}</span>
    </div>
  `,
  styleUrls: ['./pokemon-stats.component.scss'],
})
export class PokemonStatsComponent implements OnInit {

  @Input() pokemonStats: PokemonStat[];
  statsLabel = {
    'hp': 'HP',
    'attack': 'ATTACK',
    'defense': 'DEFENSE',
    'special-attack': 'SP. ATK',
    'special-defense': 'SP. DEF',
    'speed': 'SPEED'
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
