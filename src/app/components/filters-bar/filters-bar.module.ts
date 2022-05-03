import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FiltersBarComponent} from './filters-bar.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [FiltersBarComponent],
  exports: [FiltersBarComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
}) export class FiltersBarModule { }
