import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pokemon} from 'src/app/models/interfaces';

declare var $: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  @Input() message: string;
  @Input() pokemon: Pokemon;
  @Output() onCloseToast: EventEmitter<true> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    $('.toast').toast('show');
  }

  public onCloseToastFn() {
    this.onCloseToast.emit(true);
  }
}
