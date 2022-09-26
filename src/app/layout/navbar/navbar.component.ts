import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuth$: Observable<string>;
  user: User;
  subs: Subscription;
  isInit = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<{ auth: string }>
  ) {}

  ngOnInit() {
    this.AuthListener();
    this.getCurrentUser();
  }

  public getCurrentUser() {
    this.subs = this.auth.UserInfos.subscribe(user => {
      this.user = user;
    });
  }

  public onLogout() {
    this.isInit = false;
    this.auth
      .logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  public AuthListener() {
    this.isAuth$ = this.store.select('auth');
    this.isAuth$.subscribe((id: string) => {
      if (id) {
        this.isInit = false;
      } else {
        this.isInit = false;
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
