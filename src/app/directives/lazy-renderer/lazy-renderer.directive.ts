import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output
} from '@angular/core';

import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  fromIntersectionObserver,
  IntersectionStatus
} from './from-intersection-observer';
import { UnsubscribeDirective } from '../unsubscribe/unsubscribe.directive';

@Directive({ selector: '[lazyRenderer]' })
export class LazyRendererDirective
  extends UnsubscribeDirective
  implements AfterViewInit
{
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];

  @Output() visibilityChange = new EventEmitter<IntersectionStatus>();

  constructor(private element: ElementRef, private ngZone: NgZone) {
    super();
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const element = this.element.nativeElement;
      const config = {
        root: this.intersectionRoot,
        rootMargin: this.intersectionRootMargin,
        threshold: this.intersectionThreshold
      };

      fromIntersectionObserver(
        element,
        config,
        this.intersectionDebounce,
        false
      )
        .pipe(takeUntil(this.destroy), distinctUntilChanged())
        .subscribe(status => {
          this.ngZone.run(() => this.visibilityChange.emit(status));
        });
    });
  }
}
