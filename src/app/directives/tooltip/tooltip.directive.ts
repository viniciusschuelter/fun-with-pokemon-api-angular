import {ComponentRef, Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { AwesomeTooltipComponent } from './tooltip.component';

@Directive({ selector: '[awesomeTooltip]' })
export class AwesomeTooltipDirective implements OnInit, OnDestroy {

  @Input('awesomeTooltip') text = '';
  @Input() slim = false;
  @Input() hideTooltip = false;
  @Input() position: 'top' | 'bottom' | 'right' |  'left' | 'auto' = 'auto';
  @Input() noMax = false;

  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
  }

  hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
  }

  private getPositionRoles(): ConnectedPosition[] {
    // tslint:disable-next-line:max-line-length
    const top: ConnectedPosition = { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY:  -8, panelClass: 'tooltip-top', };
    // tslint:disable-next-line:max-line-length
    const bottom: ConnectedPosition = { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY:  8, panelClass: 'tooltip-bottom', };
    // tslint:disable-next-line:max-line-length
    const right: ConnectedPosition = { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX:  8, panelClass: 'tooltip-right', };
    // tslint:disable-next-line:max-line-length
    const left: ConnectedPosition = { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX:  -8, panelClass: 'tooltip-left', };

    switch (this.position) {
      case 'bottom':
        return [ bottom, top, left, right ];
      case 'right':
        return [ right, top, bottom, left ];
      case 'left':
        return [ left, top, bottom, right ];
      default:
        return [ top, bottom, left, right ];

    }
  }

  @HostListener('mouseenter')
  show() {
    if (this.hideTooltip || !this.text || !this.text.trim()) {
      return;
    }

    const positionStrategy = this.overlayPositionBuilder
        .flexibleConnectedTo(this.elementRef)
        .withPositions(this.getPositionRoles())
        .withGrowAfterOpen(true);

    this.overlayRef = this.overlay.create({ positionStrategy });

    console.log(this.overlayRef);

    if (this.hasTouch() && this.slim) {
      return;
    }

    positionStrategy.positionChanges.subscribe(p => {
      tooltipRef.instance.position = p.connectionPair.panelClass as any;
      tooltipRef.instance.noMax = this.noMax;
      tooltipRef.changeDetectorRef.detectChanges();
    });

    const tooltipRef: ComponentRef<AwesomeTooltipComponent>
      = this.overlayRef.attach(new ComponentPortal(AwesomeTooltipComponent));

    console.log(tooltipRef);

    tooltipRef.instance.text = this.text;
    tooltipRef.instance.slim = this.slim;
  }

  @HostListener('mouseleave', ['$event'])
  hide(e: MouseEvent) {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
    }
  }
}
