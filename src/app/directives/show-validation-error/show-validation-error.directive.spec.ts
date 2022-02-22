import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { CustomValidators } from 'app/validators/custom-validators';
import { instance, mock, when } from 'ts-mockito';
import { eValidationErrorMessage } from '.';
import { ShowValidationErrorDirective } from './show-validation-error.directive';

class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return (control && control.invalid) as boolean;
  }
}

const CONTROL_CONTAINER_MOCK = mock(ControlContainer);
const CONTROL_CONTAINER_INSTANCE = instance(CONTROL_CONTAINER_MOCK);

const DEFAULT_PROVIDERS = [
  { provide: ControlContainer, useValue: CONTROL_CONTAINER_INSTANCE },
  { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
];

const DEFAULT_IMPORTS = [
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
];

const DEFAULT_DECLARATIONS = [ShowValidationErrorDirective];

const getErrorMessage = () =>
  screen.getByTestId<HTMLSpanElement>('error-message');
const getMatError = () => screen.queryByTestId('mat-error');
const getInput = () => screen.getByTestId<HTMLInputElement>('form-input');
const getToInput = () => screen.getByTestId<HTMLInputElement>('input-to');
const getFromInput = () => screen.getByTestId<HTMLInputElement>('input-from');

const TEST_TEMPLATE = `
  <form [formGroup]="formGroup" data-testid="form">
    <mat-form-field>
      <input
      data-testid="form-input"
      matInput
      [formControlName]="controlName"/>
      <mat-error data-testid="mat-error">
      <span  data-testid="error-message" pxShowValidationError [pxShowValidationErrorControlName]="controlName"></span>
      </mat-error>
    </mat-form-field>
  </form>
`;

const RANGE_TEST_TEMPLATE = `
  <form [formGroup]="formGroup" data-testid="form">
    <mat-form-field>
      <input
      type="number"
      data-testid="input-from"
      matInput
      [formControlName]="'from'"/>

    </mat-form-field>
     <mat-form-field>
      <input
      type="number"
      data-testid="input-to"
      matInput
      [formControlName]="'to'"/>

    </mat-form-field>
      <mat-error data-testid="mat-error">
      <span data-testid="error-message" pxShowValidationError [pxShowValidationErrorControlName]="'from'"></span>
      </mat-error>
  </form>
`;

describe('ShowValidationErrorDirective', () => {
  it('should not display any errors on the screen.', async () => {
    const testForm = new FormGroup({
      required: new FormControl(null, [Validators.required]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'required',
      },
    });

    const $input = getInput();
    userEvent.type($input, 'test');
    const $matError = getMatError();
    expect($matError).toBeNull();
  });

  it('should show the error message for the required field.', async () => {
    const testForm = new FormGroup({
      required: new FormControl(null, [Validators.required]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'required',
      },
    });

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;

    expect(message).toBe(eValidationErrorMessage.REQUIRED);
  });

  it('should show the error message for the min field.', async () => {
    const testForm = new FormGroup({
      min: new FormControl(null, [Validators.min(1)]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'min',
      },
    });
    const $input = getInput();

    userEvent.type($input, '0');

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;

    expect(message).toBe(eValidationErrorMessage.MIN);
  });

  it('should show the error message for the max field.', async () => {
    const testForm = new FormGroup({
      max: new FormControl(null, [Validators.max(1)]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'max',
      },
    });
    const $input = getInput();

    userEvent.type($input, '2');

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;
    expect(message).toBe(eValidationErrorMessage.MAX);
  });

  it('should show the error message for the wrong pokemon name.', async () => {
    const to = 0;
    const from = 151;
    const testForm = new FormGroup({
      pokemonName: new FormControl(null, [
        CustomValidators.pokemonNameForGeneration(to, from),
      ]),
    });

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'pokemonName',
      },
    });
    const $input = getInput();

    userEvent.type($input, 'test');

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;
    expect(message).toBe(eValidationErrorMessage.POKEMON_NAME);
  });

  it('should show the error message for the wrong pokemon range.', async () => {
    const testForm = new FormGroup(
      {
        from: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(898),
        ]),
        to: new FormControl(24, [
          Validators.required,
          Validators.min(1),
          Validators.max(898),
        ]),
      },
      [
        CustomValidators.range({
          previousControl: 'from',
          nexControl: 'to',
        }),
      ]
    );

    when(CONTROL_CONTAINER_MOCK.control).thenReturn(testForm);

    await render(RANGE_TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        to: 'to',
        from: 'from',
      },
    });

    const $inputFrom = getToInput();
    const $inputTo = getFromInput();

    userEvent.type($inputTo, '5');
    userEvent.type($inputFrom, '-1');

    const $matError = getMatError();
    expect($matError).toBeTruthy();

    const $errorMessage = getErrorMessage();
    const message = $errorMessage.innerHTML;
    expect(message).toBe(eValidationErrorMessage.RANGE);
  });
});
