import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <section
      class="d-flex flex-grow-1 justify-content-center align-items-center h-100 w-100"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </section>
  `,
  styles: [
    `
      .spinner-border {
        width: 4rem;
        height: 4rem;
      }
    `
  ]
})
export class LoadingComponent {}
