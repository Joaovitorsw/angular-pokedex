import {
  FormControl,
  FormGroup,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { instance, mock, when } from 'ts-mockito';
import { DisableControlDirective } from './disable-control.directive';

const NG_CONTROL_MOCK = mock(NgControl);
const NG_CONTROL_INSTANCE = instance(NG_CONTROL_MOCK);

const TEST_TEMPLATE = `
  <form [formGroup]="formGroup" data-testid="form">
    <mat-form-field>
      <input
      data-testid="form-input"
      matInput
      [formControlName]="controlName"
      [pxDisableControl]="condition"
      />
    </mat-form-field>
  </form>
`;

const DEFAULT_PROVIDERS = [
  { provide: NgControl, useValue: NG_CONTROL_INSTANCE },
];

const DEFAULT_IMPORTS = [
  ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
];

const DEFAULT_DECLARATIONS = [DisableControlDirective];

const getInput = () => screen.getByTestId<HTMLInputElement>('form-input');

const testForm = new FormGroup({
  required: new FormControl(null),
});

describe('DisableControlDirective', () => {
  it('should update disabled status', async () => {
    const control = testForm.controls['required'];

    when(NG_CONTROL_MOCK.control).thenReturn(control);

    const { rerender } = await render(TEST_TEMPLATE, {
      declarations: DEFAULT_DECLARATIONS,
      providers: DEFAULT_PROVIDERS,
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        formGroup: testForm,
        controlName: 'required',
        condition: true,
      },
    });

    const controlStatus = control.disabled;

    expect(controlStatus).toBeTruthy();

    await rerender({
      formGroup: testForm,
      controlName: 'required',
      condition: false,
    });

    expect(controlStatus).toBeFalsy();
  });
});
