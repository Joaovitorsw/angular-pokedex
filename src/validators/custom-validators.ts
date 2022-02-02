import { AbstractControl, FormGroup } from '@angular/forms';
import { POKEMONS_NAMES } from '@pokedex/mocks';
import { eValidationErrorKeys } from 'app/directives/show-validation-error';

interface RangeOptions {
  previousControl: string;
  nexControl: string;
}

export class CustomValidators {
  static pokemonNameForGeneration(from: number, to: number) {
    return (control: AbstractControl) => {
      const initialIndex = from - 1;
      const selectedRange = POKEMONS_NAMES.slice(initialIndex, to);
      const isValid = selectedRange.some((pokemonName) => {
        const pokemonNameLower = pokemonName.toLowerCase();
        const controlValue = control.value.toLowerCase();
        return pokemonNameLower.includes(controlValue);
      });

      if (!isValid)
        return {
          [eValidationErrorKeys.POKEMON_NAME]: true,
        };

      return null;
    };
  }

  static range(rangeOptions: RangeOptions) {
    return (formGroup: AbstractControl) => {
      const { controls } = formGroup as FormGroup;
      const { previousControl, nexControl } = rangeOptions;
      const myControls = Object.values(controls);

      const previousControlValue = controls[previousControl].value;
      const nexControlValue = controls[nexControl].value;

      if (previousControlValue <= nexControlValue) {
        myControls.forEach((control) => {
          const rangeError: boolean = control.errors?.range;
          if (control.valid || rangeError) {
            control.setErrors(null);
          }
        });

        return null;
      }

      myControls.forEach((control) => {
        control.setErrors({
          [eValidationErrorKeys.RANGE]: true,
        });
      });

      return { [eValidationErrorKeys.RANGE]: true };
    };
  }
}
