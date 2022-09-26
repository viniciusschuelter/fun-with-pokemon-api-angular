import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyRendererDirective } from './lazy-renderer.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LazyRendererDirective],
  exports: [LazyRendererDirective]
})
export class LazyRendererModule {}
