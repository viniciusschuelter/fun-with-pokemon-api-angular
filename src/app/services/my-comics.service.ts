import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

import {from, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Comic} from '../models/interfaces';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyComicsService {
  uid: string = this.auth.getCurrUserUid();

  constructor(
    private Afirestore: AngularFirestore,
    private auth: AuthService
  ) {
  }

  public addNewComic(comic: Comic): Observable<any> {
    const uid = this.auth.getCurrUserUid();
    const comicWithUser = {...comic, uid};
    return from(
      this.Afirestore.doc(`comics/${uid}${comic.id}`).set(comicWithUser)
    ).pipe(catchError(this.handleErrors));
  }

  public getAllComics(): Observable<any[]> {
    const uid = this.auth.getCurrUserUid();
    return from(
      this.Afirestore.collection('comics', (ref) =>
        ref.where('uid', '==', uid)
      ).valueChanges()
    ).pipe(catchError(this.handleErrors));
  }

  public removeComic(comicId: string): Observable<any> {
    return from(this.Afirestore.doc(`comics/${comicId}`).delete()).pipe(
      catchError(this.handleErrors)
    );
  }

  public getComicById(comicId: string): Observable<any> {
    const uid = this.auth.getCurrUserUid();
    return from(
      this.Afirestore.doc(`comics/${uid + comicId}`).valueChanges()
    ).pipe(catchError(this.handleErrors));
  }

  public editComic(comic: Comic): Observable<any> {
    const uid = this.auth.getCurrUserUid();
    return from(
      this.Afirestore.doc(`comics/${uid + comic.id}`).update(comic)
    ).pipe(catchError(this.handleErrors));
  }

  private handleErrors(error: HttpErrorResponse) {
    const err = 'Something wrong!';
    if (error) {
      return throwError(
        error.error?.message ? error.error?.message : error.message
      );
    } else {
      return throwError(err);
    }
  }
}
