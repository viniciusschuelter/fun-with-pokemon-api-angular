import {
  Directive,
  effect,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Signal
} from '@angular/core';
import { fromVisibilityObserver } from '@angular-primitives/intersection-observer';

@Directive({ standalone: true, selector: '[lazyRenderer]' })
export class LazyRendererDirective {
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];

  @Output() visibilityChange = new EventEmitter<boolean>();

  constructor(private element: ElementRef) {
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    const signalObserver: Signal<boolean> = fromVisibilityObserver(
      this.element.nativeElement,
      config
    );

    effect(() => {
      this.visibilityChange.emit(signalObserver());
      console.log('the card is rendered: ' + signalObserver());
    });
  }
}
