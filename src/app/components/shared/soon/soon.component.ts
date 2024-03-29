import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-soon',
  template: `
    <section class="my-5 soon">
      <div class="container">
        <div
          class="mx-auto d-flex flex-column justify-content-between align-items-center h-100"
        >
          <h1 class="text-danger text-center my-5 text-capitalize">
            adding pokemon to your favorites...
          </h1>
          <h3 class="text-secondary text-center mb-3">
            Redirecting you to login page
          </h3>
          <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
            <span class="sr-only">Loading...</span>
          </div>

          <p class="lead text-center text-capitalize mt-5">
            Welcome dear Guest you need to login or register to perform this task
            please wait ....
          </p>
          <button
            routerLink="/"
            class="d-block mx-auto btn btn-outline-danger mt-5 text-capitalize"
          >
            Back To Home
          </button>
        </div>
      </div>
    </section>
  `
})
export class SoonComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.router.navigate(['/auth/login']), 2000);
  }
}
