import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { combineLatest, firstValueFrom, from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../models/interfaces';
import { AuthService } from './auth.service';
import { handleErrors } from '../utils/utils';

@Injectable({providedIn: 'root'})
export class FavoritesService {
  constructor(
    private Afirestore: AngularFirestore,
    private auth: AuthService
  ) {}

  public addNewFavorite(pokemon: Pokemon): Observable<any> {
    const payload = {
      id: pokemon.id,
      name: pokemon.name,
      uid: this.auth.getCurrUserUid()
    };
    return from(this.Afirestore.collection(`favorites/`).add(payload)).pipe(
      catchError(handleErrors)
    );
  }

  public getAllFavorites(): Observable<any[]> {
    return from(
      this.Afirestore.collection('favorites', ref => ref.where('uid', '==', this.auth.getCurrUserUid())
      ).valueChanges()
    ).pipe(catchError(handleErrors));
  }

  public removeFavorite(pokemonId: number): Observable<any> {
    return combineLatest(
      this.getDocReferences(pokemonId).then(refs => refs.map(ref => this.Afirestore.doc(`favorites/${ref}`).delete())
      )
    ).pipe(catchError(handleErrors));
  }

  public async getDocReferences(id): Promise<string[]> {
    const snapshot = await firstValueFrom(
      this.Afirestore.collection('favorites', ref => (
          ref.where('uid', '==', this.auth.getCurrUserUid()) &&
          ref.where('id', '==', id)
        )).get()
    );
    return snapshot.docs.map(_ => _.ref.id);
  }
}
