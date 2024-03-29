import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-not-found',
  template: `
    <section class="my-5">
      <div class="container">
        <div
          class="mx-auto d-flex flex-column justify-content-between align-items-center h-100"
        >
          <h1 class="text-pro3 display-3 text-center my-5">Oops! Error 404</h1>
          <h3 class="text-secondary text-center">Page Not Found</h3>
          <p class="lead text-center">
            We can't seem to find the page you're looking for.
          </p>
          <button routerLink="/" class="d-block mx-auto btn btn-outline-danger">
            Back To Home
          </button>
        </div>
      </div>
    </section>
  `
})
export class NotFoundComponent {}
