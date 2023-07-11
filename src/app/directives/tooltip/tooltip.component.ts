import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'awesome-tooltip',
  styleUrls: ['./tooltip.component.scss'],
  template: `
    <div class="tool-tip" role="tooltip" @tooltip>
      <div class="arrow"></div>
      <div class="tooltip-inner" [innerHTML]="text"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [animate(300, style({ opacity: 0 }))])
    ])
  ]
})
export class AwesomeTooltipComponent {
  @Input() @HostBinding('class') position: string;
  @Input() @HostBinding('class.no-max') noMax = false;
  @Input() text = '';
  @Input() slim = false;
}
