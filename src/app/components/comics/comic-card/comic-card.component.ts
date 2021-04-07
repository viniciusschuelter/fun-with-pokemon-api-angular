import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Pokemon} from 'src/app/models/interfaces';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-comic-card',
  templateUrl: './comic-card.component.html',
  styleUrls: ['./comic-card.component.scss'],
})
export class ComicCardComponent implements OnInit {

  @Input() pokemon: Pokemon;
  @Input() page: string;
  isAuth$: Observable<string>;
  uid: string = null;
  isInit = true;
  isToast = false;

  constructor(
    private auth: AuthService,
    private store: Store<{ auth: string }>
  ) {
  }

  ngOnInit(): void {
    this.AuthListener();
    this.checkCreator();
  }

  public checkCreator() {
    this.uid = this.auth.getCurrUserUid();
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

  public onFavClicked(id: number) {
    if (id === this.pokemon.id) {
      this.isToast = true;
    }
  }

  public onCloseToast() {
    this.isToast = false;
  }
}
