import { NgModule } from '@angular/core';
import { SwRegistrationOptions } from '@angular/service-worker';

import { AuthGuard } from 'src/app/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment.prod';
import { PokemonService } from '../../services/pokemon.service';

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    UsersService,
    PokemonService,
    LocalStorageService,
    FavoritesService,
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: environment.production }),
    },
  ],
})
export class CoreModule {}
