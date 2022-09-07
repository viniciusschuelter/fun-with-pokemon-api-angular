import {Component, Input} from '@angular/core';
import {Pokemon, PokemonMini} from 'src/app/models/interfaces';

@Component({
  selector: 'app-pokemon-more-details',
  templateUrl: './pokemon-more-details.component.html',
  styleUrls: ['./pokemon-more-details.component.scss'],
})
export class PokemonMoreDetailsComponent {
  @Input() pokemon: Pokemon & PokemonMini;
  @Input() myFavorites: PokemonMini[];
}
