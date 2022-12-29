import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <section
      *ngIf="!close"
      class="mt-5 alert alert-danger text-center my-5 mx-auto error"
    >
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span (click)="close = !close" aria-hidden="true">&times;</span>
      </button>
      <h5 class="text-muted">{{ message }}</h5>
    </section>
  `
})
export class ErrorComponent {
  @Input() message: string = '';
  close: boolean = false;
}
