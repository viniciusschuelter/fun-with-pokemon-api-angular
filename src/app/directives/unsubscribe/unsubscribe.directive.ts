import { OnDestroy, Directive } from '@angular/core';

import { Subject } from 'rxjs';

@Directive()
export class UnsubscribeDirective implements OnDestroy {
  get destroy() {
    return this._destroy.asObservable();
  }
  protected _destroy = new Subject<void>();

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
