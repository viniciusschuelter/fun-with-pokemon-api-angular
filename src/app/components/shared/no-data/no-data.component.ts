import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  template: `
    <section class="my-5">
      <div class="alert alert-info d-flex flex-column" role="alert">
        <i
          class="fa fa-exclamation-circle d-block mx-auto h2 text-info"
          aria-hidden="true"
        ></i>
        <strong class="lead text-center text-capitalize">
          {{
          message ? message : "no data found in our database please try later !"
          }}
        </strong>
      </div>
    </section>
  `
})
export class NoDataComponent {
  @Input() message: string;
}
