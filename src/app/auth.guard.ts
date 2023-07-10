import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard  {
  isAuth$: Observable<string>;

  constructor(private router: Router, private store: Store<{ auth: string }>) {
    this.isAuth$ = this.store.select('auth');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.isAuth$.subscribe(uid => {
      if (!uid) {
        this.router.navigate(['/auth/login']);
      }
    });

    return true;
  }
}
