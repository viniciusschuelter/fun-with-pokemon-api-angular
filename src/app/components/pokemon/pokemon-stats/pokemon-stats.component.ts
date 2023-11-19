import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonStat } from 'src/app/models/interfaces';

@Component({
  standalone: true,
  selector: 'app-pokemon-stats',
  template: `
    @for (item of pokemonStats; track item.stat?.name) {
      <div class="d-flex align-items-center">
        <span class="label stats pr-2 text-uppercase">
        {{ statsLabel[item.stat?.name] }}
        </span>
        <div class="progress m-2 w-100">
          <div
            class="progress-bar {{ item.stat?.name }}"
            [style.width]="item?.base_stat * 0.65 + '%'"
          ></div>
        </div>
        <span class="label number">{{ item?.base_stat }}</span>
      </div>
    }

  `,
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
