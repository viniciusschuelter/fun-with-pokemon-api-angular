import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Pokemon} from 'src/app/models/interfaces';
import {PokemonService} from '../../../services/pokemon.service';

@Component({
  selector: 'app-comics-details',
  templateUrl: './comics-details.component.html',
  styleUrls: ['./comics-details.component.scss'],
})
export class ComicsDetailsComponent implements OnInit {

  pokemon: Pokemon;
  isLoading: boolean;
  isError: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const query = this.route.snapshot.queryParams.creator;
    const id = this.route.snapshot.paramMap.get('id');

    this.isError = null;
    this.isLoading = false;
    this.fetchComicDetails(id);
  }

  public fetchComicDetails(id: string) {
    this.isError = null;
    this.isLoading = true;
    this.pokemonService.getPokemonByUrl(id).subscribe(
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
