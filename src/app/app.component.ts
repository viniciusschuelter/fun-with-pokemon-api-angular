import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <app-navbar class="nav"></app-navbar>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      width: 100%;
      min-height: 100vh;

    .nav {
      margin-bottom: 100px;
    }

    .content {
      min-height: 100%;
    }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.authCheck();
  }
}
