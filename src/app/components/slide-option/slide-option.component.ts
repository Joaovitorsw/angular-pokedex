import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'px-slide-option',
  templateUrl: './slide-option.component.html',
  styleUrls: ['./slide-option.component.scss'],
})
export class SlideOptionComponent {
  @Input() option: string;
  @Input() status: boolean;
  @Input() icon: string;
  @Output() change: EventEmitter<MatSlideToggleChange> = new EventEmitter();

  changeOption(event: MatSlideToggleChange) {
    this.change.emit(event);
  }
}
