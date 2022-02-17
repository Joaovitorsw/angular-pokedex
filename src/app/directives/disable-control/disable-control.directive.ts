import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[pxDisableControl]',
})
export class DisableControlDirective implements OnChanges {
  control: AbstractControl;
  @Input() set pxDisableControl(condition: boolean) {
    const hasControl = this.ngControl.control;
    if (!hasControl) return;
    const method = condition ? 'disable' : 'enable';
    this.ngControl.control![method]();
  }

  constructor(private ngControl: NgControl) {}

  ngOnChanges(changes: SimpleChanges): void {
    const pxDisableControlProperty = changes['pxDisableControl'];
    if (pxDisableControlProperty) {
      const boolean = pxDisableControlProperty.currentValue;
      this.pxDisableControl = boolean;
    }
  }
}
