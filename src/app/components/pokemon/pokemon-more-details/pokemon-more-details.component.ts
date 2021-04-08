import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from 'src/app/models/interfaces';

@Component({
  selector: 'app-pokemon-more-details',
  templateUrl: './pokemon-more-details.component.html',
  styleUrls: ['./pokemon-more-details.component.scss'],
})
export class PokemonMoreDetailsComponent implements OnInit {

  @Input() pokemon: Pokemon;

  isLoading = false;
  isError = null;
  isToast = false;

  constructor() {
  }

  ngOnInit(): void {
  }


  public onFavClicked(id: number) {
    if (id === this.pokemon.id) {
      this.isToast = true;
    }
  }

  public onCloseToast() {
    this.isToast = false;
  }
}
