import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Pokemon } from '../../models/interfaces';
import { LocalStorageService } from '../../services/local-storage.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonDataService extends EntityCollectionServiceBase<Pokemon> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private localStorageService: LocalStorageService
  ) {
    super('Pokemon', serviceElementsFactory);
    this.rehydratePokemonStore();
  }

  private rehydratePokemonStore(): void {
    const pokemons = this.localStorageService.getItem('pokemons');
    if (pokemons) {
      this.addManyPokemons(pokemons);
    }
  }

  async addOnePokemon(pokemon: Pokemon): Promise<void> {
    this.addOneToCache(pokemon);
    this.localStorageService.setItem(
      'pokemons',
      await firstValueFrom(this.entities$)
    );
  }

  private async addManyPokemons(pokemons: Pokemon[]): Promise<void> {
    this.addManyToCache(pokemons);
  }
}
