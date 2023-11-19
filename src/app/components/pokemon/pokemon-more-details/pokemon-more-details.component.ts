import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Pokemon, PokemonMini } from 'src/app/models/interfaces';

@Component({
  selector: 'app-pokemon-more-details',
  templateUrl: './pokemon-more-details.component.html',
  styles: `
    :host {
      .badge {
        height: 22px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonMoreDetailsComponent {
  @Input() pokemon: Pokemon & PokemonMini;
  @Input() myFavorites: PokemonMini[];
}
