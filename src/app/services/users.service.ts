import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { User } from '../models/interfaces';
import { catchError, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import 'firebase/auth';
import { handleErrors } from '../utils/utils';

@Injectable({providedIn: 'root'})
export class UsersService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private Afirestore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.Afirestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public async googleSignin() {
    const provider = await new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.returnNewSocialUser(credential);
  }

  public returnNewSocialUser(credential: any) {
    const newSocialUser = {
      uid: credential.user.uid,
      name: credential.user.displayName,
      email: credential.user.email,
      joind_date: new Date()
    };
    this.addNewUser(newSocialUser)
      .pipe(catchError(handleErrors))
      .subscribe(data => data);

    return newSocialUser;
  }

  public async FacebookAuth() {
    const provider = await new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.returnNewSocialUser(credential);
  }

  public addNewUser(user: User) {
    return from(this.Afirestore.doc(`users/${user.uid}`).set(user)).pipe(
      catchError(handleErrors)
    );
  }

  public getUserById(uid: string): Observable<any> {
    return this.Afirestore.doc(`users/${uid}`)
      .valueChanges()
      .pipe(catchError(handleErrors));
  }
}
