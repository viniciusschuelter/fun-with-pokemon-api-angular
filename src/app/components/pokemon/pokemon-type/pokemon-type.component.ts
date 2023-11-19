import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PokemonTypesEnum } from 'src/app/models/interfaces';
import { AwesomeTooltipModule } from '../../../directives/tooltip/tooltip.module';
import { typePokemonColors } from '../../../mocks/pokemon-mock';

@Component({
  standalone: true,
  selector: 'app-pokemon-type',
  template: `
    <div class="icon badge badge-pill p-1" [style.backgroundColor]="typeColors[type]" [awesomeTooltip]="type">
      <img class="img" src="./assets/icons/svg/{{ type }}.svg" />
    </div>
  `,
  imports: [AwesomeTooltipModule],
  styles: `
    :host {
      display: block;

      .img {
          width: 20px;
          height: 20px;
      }
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonTypeComponent {
  @Input() type: PokemonTypesEnum;

  typeColors = typePokemonColors;
}
