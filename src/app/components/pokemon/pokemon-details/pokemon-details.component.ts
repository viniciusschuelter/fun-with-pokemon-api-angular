import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Pokemon} from 'src/app/models/interfaces';
import {PokemonService} from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: Pokemon;
  isLoading: boolean;
  isError: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('url');

    this.isError = null;
    this.isLoading = false;
    this.fetchPokemonDetails(url);
  }

  public fetchPokemonDetails(url: string) {
    this.isError = null;
    this.isLoading = true;
    this.pokemonService.getPokemonByUrl(url).subscribe(
      (pokemon: Pokemon) => {
        this.isLoading = false;
        this.pokemon = pokemon;
      },
      (err) => {
        this.isLoading = false;
        this.isError = err;
      }
    );
  }
}
