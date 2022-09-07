import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AwesomeTooltipDirective} from './tooltip.directive';
import {AwesomeTooltipComponent} from './tooltip.component';
@NgModule({
  declarations: [AwesomeTooltipComponent, AwesomeTooltipDirective],
  exports: [AwesomeTooltipComponent, AwesomeTooltipDirective],
  imports: [CommonModule, OverlayModule]
})
export class AwesomeTooltipModule {}
