import { AbstractControl, FormGroup } from '@angular/forms';
import { eValidationErrorKeys } from 'app/directives/show-validation-error';

interface RangeOptions {
  previousControl: string;
  nexControl: string;
}

export class CustomValidators {
  static personName(control: AbstractControl) {
    const pattern = /[Á-ÚA-Z][á-úa-z]{2,} [Á-ÚA-Z][á-úa-z]{2,}[ Á-ÚA-Zá-úa-z]*/;

    const isInvalid = !pattern.test(control.value);

    if (isInvalid)
      return {
        [eValidationErrorKeys.NAME]: true,
      };

    return null;
  }

  static range(rangeOptions: RangeOptions) {
    return (control: AbstractControl) => {
      const { controls } = control as FormGroup;
      const { previousControl, nexControl } = rangeOptions;

      const previousControlValue = controls[previousControl].value;
      const nexControlValue = controls[nexControl].value;

      if (previousControlValue > nexControlValue)
        return { [eValidationErrorKeys.RANGE]: true };

      return null;
    };
  }
}
