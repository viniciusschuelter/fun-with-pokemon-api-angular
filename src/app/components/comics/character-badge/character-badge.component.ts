import { Component, Input, OnInit } from '@angular/core';
import {Pokemon} from 'src/app/models/interfaces';

@Component({
  selector: 'app-character-badge',
  templateUrl: './character-badge.component.html',
  styleUrls: ['./character-badge.component.scss'],
})
export class CharacterBadgeComponent implements OnInit {

  @Input() character: Pokemon;
  isClosed = false;
  constructor() {}

  ngOnInit(): void {}
}
