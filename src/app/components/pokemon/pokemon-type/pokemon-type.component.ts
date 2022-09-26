import { Component, Input } from '@angular/core';
import { PokemonTypesEnum } from 'src/app/models/interfaces';
import { AwesomeTooltipModule } from '../../../directives/tooltip/tooltip.module';

@Component({
  standalone: true,
  selector: 'app-pokemon-type',
  template: `
    <div class="icon badge badge-pill p-1 {{ type }}" [awesomeTooltip]="type">
      <img src="./assets/icons/svg/{{ type }}.svg" />
    </div>
  `,
  imports: [AwesomeTooltipModule],
  styleUrls: ['./pokemon-type.component.scss']
})
export class PokemonTypeComponent {
  @Input() type: PokemonTypesEnum;
}
