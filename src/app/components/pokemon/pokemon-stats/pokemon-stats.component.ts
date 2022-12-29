import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonStat } from 'src/app/models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pokemon-stats',
  template: `
    <div class="d-flex align-items-center" *ngFor="let item of pokemonStats">
      <span class="label stats pr-2">{{
        statsLabel[item.stat?.name] | uppercase
      }}</span>
      <div class="progress m-2 w-100">
        <div
          class="progress-bar {{ item.stat?.name }}"
          [style.width]="item?.base_stat * 0.65 + '%'"
        ></div>
      </div>
      <span class="label number">{{ item?.base_stat }}</span>
    </div>
  `,
  imports: [CommonModule],
  styleUrls: ['./pokemon-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonStatsComponent {
  @Input() pokemonStats: PokemonStat[];
  statsLabel = {
    hp: 'HP',
    attack: 'ATTACK',
    defense: 'DEFENSE',
    'special-attack': 'SP. ATK',
    'special-defense': 'SP. DEF',
    speed: 'SPEED'
  };
}
