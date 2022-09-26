import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth/auth.action';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/interfaces';
import { UsersService } from './users.service';
import { handleErrors } from '../utils/utils';

@Injectable({providedIn: 'root'})
export class AuthService {
  uid$: Observable<string>;
  currUser: User;
  idUser: string;
  UserInfos = new BehaviorSubject<User>(null);

  constructor(
    private fireAuth: AngularFireAuth,
    private store: Store<{ auth: string }>,
    private Cservice: UsersService
  ) {}

  public async signUp(email: string, pass: string) {
    return await this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }

  public async login(email: string, pass: string) {
    return await this.fireAuth.signInWithEmailAndPassword(email, pass);
  }

  public async logout() {
    return await this.fireAuth.signOut();
  }

  public async authCheck() {
    this.fireAuth.authState.pipe(catchError(handleErrors)).subscribe(
      user => {
        if (user) {
          this.store.dispatch(authActions.login({ uid: user.uid }));
          this.getUser(user);
        } else {
          this.store.dispatch(authActions.logout());
          this.currUser = null;
          this.UserInfos.next(null);
        }
      },
      err => console.log(err)
    );
  }

  public getUser(user: User) {
    if (user.displayName || user.email) {
      this.currUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email
      };
      this.UserInfos.next({ ...this.currUser });
      return this.currUser;
    } else {
      this.Cservice.getUserById(user.uid).subscribe((resUser: User) => {
        this.UserInfos.next({ ...resUser });
        return user;
      });
    }
  }

  // !get user Uid
  public getCurrUserUid(): string | null {
    this.uid$ = this.store.select('auth');
    this.uid$.subscribe(
      uid => {
        this.idUser = uid;
      },
      err => null
    );
    return this.idUser ? this.idUser : null;
  }

  public isAuth() {
    return;
  }
}
