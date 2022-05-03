import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LazyLoadingScrollComponent} from './lazy-loading-scroll.component';


@NgModule({
  declarations: [LazyLoadingScrollComponent],
  exports: [LazyLoadingScrollComponent],
  imports: [
    CommonModule
  ]
}) export class LazyLoadingScrollModule { }
