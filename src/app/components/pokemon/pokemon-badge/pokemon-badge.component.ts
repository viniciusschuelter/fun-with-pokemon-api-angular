import { Component, Input, OnInit } from '@angular/core';
import {Pokemon} from 'src/app/models/interfaces';

@Component({
  selector: 'app-pokemon-badge',
  templateUrl: './pokemon-badge.component.html',
  styleUrls: ['./pokemon-badge.component.scss'],
})
export class PokemonBadgeComponent implements OnInit {

  @Input() character: Pokemon;
  isClosed = false;
  constructor() {}

  ngOnInit(): void {}
}
