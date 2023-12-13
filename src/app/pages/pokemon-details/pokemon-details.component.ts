import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon, PokemonMini } from 'src/app/models/interfaces';
import { PokemonService } from '../../services/pokemon.service';
import { Observable } from 'rxjs';
import { PokemonDataService } from '../../store/pokemon/pokemon-data.service';
import { map } from 'rxjs/operators';
import { selectFavoritesPokemons } from '../../store/pokemon/pokemon.selector';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../store/pokemon/pokemon.reducer';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailsComponent {
  pokemon$: Observable<Pokemon> = this.pokemonDataService.entityMap$.pipe(
    map(_ => _[this.route.snapshot.paramMap.get('url')])
  );
  myFavorites$: Observable<PokemonMini[]> = this.store
    .select(selectFavoritesPokemons)
    .pipe();

  constructor(
    private pokemonService: PokemonService,
    private pokemonDataService: PokemonDataService,
    private store: Store<{ auth: string; pokemon: PokemonState }>,
    private route: ActivatedRoute
  ) {}
}
