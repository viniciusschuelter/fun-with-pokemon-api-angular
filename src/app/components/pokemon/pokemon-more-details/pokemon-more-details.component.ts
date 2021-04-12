import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from 'src/app/models/interfaces';
import {PokemonService} from "../../../services/pokemon.service";
import {ToastrService} from "ngx-toastr";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-pokemon-more-details',
  templateUrl: './pokemon-more-details.component.html',
  styleUrls: ['./pokemon-more-details.component.scss'],
})
export class PokemonMoreDetailsComponent implements OnInit {

  @Input() pokemon: Pokemon;

  isLoading = false;
  isError = null;
  myFavorites = this.localService.getItem('favorite');

  constructor(
    private toastr: ToastrService,
    private localService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
  }


  addToMyFavorites() {
    const index = this.myFavorites.findIndex(fav => fav.name === this.pokemon.name);
    if (index >= 0) {
      this.myFavorites.splice(index, 1);
      this.toastr.success('Now this pokemon is not your favorite', 'Success');
    } else {
      this.myFavorites = [...this.myFavorites, this.pokemon];
      this.toastr.success('Now this pokemon is your favorite', 'Success');
    }
    this.localService.setItem('favorite', this.myFavorites);
    this.myFavorites = [...this.myFavorites];
  }
}
