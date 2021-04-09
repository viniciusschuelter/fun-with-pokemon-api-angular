import {Component, Input, OnInit} from '@angular/core';
import {PokemonTypesEnum} from 'src/app/models/interfaces';

@Component({
  selector: 'app-pokemon-type',
  template: `
    <div class="icon badge badge-pill p-1 {{type}}" [awesomeTooltip]="type">
      <img src="./assets/icons/svg/{{type}}.svg"/>
    </div>
  `,
  styleUrls: ['./pokemon-type.component.scss'],
})
export class PokemonTypeComponent implements OnInit {

  @Input() type: PokemonTypesEnum;

  constructor() {
  }

  ngOnInit(): void {
  }
}
