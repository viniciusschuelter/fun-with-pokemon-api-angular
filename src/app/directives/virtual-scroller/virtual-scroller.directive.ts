import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { fromViewportObserver } from '@angular-primitives/intersection-observer';
import { Observable } from 'rxjs';

@Directive({ standalone: true, selector: '[virtualScroller]' })
export class VirtualScrollerDirective implements AfterViewInit {
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot: HTMLElement;
  @Input() intersectionThreshold: number | number[];
  @Input() items!: Signal<any> | Observable<any>;
  @Output() itemsRendered: EventEmitter<any> = new EventEmitter<any>();

  private element = inject(ElementRef);
  private injector = inject(Injector);
  signalViewport: WritableSignal<{ [n: number]: boolean }> = signal({});

  ngAfterViewInit() {
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    };

    this.signalViewport = fromViewportObserver(
      this.element.nativeElement,
      config,
      { items: this.items, injector: this.injector }
    );
    this.itemsRendered.emit(this.signalViewport);
  }
}
