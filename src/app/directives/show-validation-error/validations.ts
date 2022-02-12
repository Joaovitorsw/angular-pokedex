import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export enum eValidationErrorMessage {
  REQUIRED = 'This field <strong>is required</strong>',
  POKEMON_NAME = 'This pokemon name <strong> is not valid </strong>',
  MIN = 'This field <strong> must be at least </strong>',
  MAX = 'This field <strong> must be at most </strong>',
  RANGE = 'This <strong>is not valid range</strong>',
}

export enum eValidationErrorKeys {
  POKEMON_NAME = 'pokemon-name',
  MIN = 'min',
  MAX = 'max',
  REQUIRED = 'required',
  RANGE = 'range',
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (control && control.invalid) as boolean;
  }
}

export const VALIDATIONS = [
  {
    errorName: eValidationErrorKeys.REQUIRED,
    messageFn: () => eValidationErrorMessage.REQUIRED,
  },
  {
    errorName: eValidationErrorKeys.POKEMON_NAME,
    messageFn: () => eValidationErrorMessage.POKEMON_NAME,
  },

  {
    errorName: eValidationErrorKeys.MIN,
    messageFn: () => eValidationErrorMessage.MIN,
  },
  {
    errorName: eValidationErrorKeys.MAX,
    messageFn: () => eValidationErrorMessage.MAX,
  },

  {
    errorName: eValidationErrorKeys.RANGE,
    messageFn: () => eValidationErrorMessage.RANGE,
  },
];
