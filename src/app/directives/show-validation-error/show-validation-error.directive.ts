import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { VALIDATIONS } from './validations';

@Directive({
  selector: '[pxShowValidationError]',
})
export class ShowValidationErrorDirective implements AfterContentInit {
  @Input('pxShowValidationError') controlName: string;
  constructor(
    private elementRef: ElementRef,
    private container: ControlContainer
  ) {}

  ngAfterContentInit(): void {
    const formGroup = this.container.control as FormGroup;

    const formControl = formGroup.controls[this.controlName];
    const validate = () => {
      const errorMessage = this.getErrorMessage(formControl);
      const errorMessageParent = this.getErrorMessage(formGroup);
      const error = errorMessage || errorMessageParent;
      this.setInnerHTML(error);
    };
    const initialStatus = formControl.status;
    formControl.statusChanges
      .pipe(startWith(initialStatus))
      .subscribe(validate);
    formGroup.statusChanges
      .pipe(startWith(formGroup.status))
      .subscribe(validate);
  }

  private setInnerHTML(html: string): void {
    this.elementRef.nativeElement.innerHTML = html;
  }

  private getErrorMessage(control: AbstractControl): string {
    const message: string =
      VALIDATIONS.find((validationObject) =>
        control.hasError(validationObject.errorName)
      )?.messageFn() || '';
    return message;
  }
}
