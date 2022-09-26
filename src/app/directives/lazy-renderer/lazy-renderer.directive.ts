import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import {
  fromIntersectionObserver,
  IntersectionStatus
} from './from-intersection-observer';
import {UnsubscribeDirective} from '../unsubscribe/unsubscribe.directive';

@Directive({ selector: '[lazyRenderer]' })
export class LazyRendererDirective extends UnsubscribeDirective implements OnInit {
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];

  @Output() visibilityChange = new EventEmitter<IntersectionStatus>();

  constructor(private element: ElementRef) {
    super();
  }

  ngOnInit() {
    const element = this.element.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    fromIntersectionObserver(element, config, this.intersectionDebounce)
      .pipe(takeUntil(this.destroy))
      .subscribe(status => {
        this.visibilityChange.emit(status);
      });
  }
}
