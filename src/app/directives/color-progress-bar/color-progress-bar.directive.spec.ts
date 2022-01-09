import { MatProgressBarModule } from '@angular/material/progress-bar';
import { render, screen } from '@testing-library/angular';
import { ColorProgressBarDirective } from '.';

const TEST_TEMPLATE = `
    <mat-progress-bar
      class="pxColorProgressBar"
      [value]="55.5"
      mode="determinate"
      data-testid="progress-bar"
    ></mat-progress-bar>
`;

describe('ColorProgressBarDirective', () => {
  it('should set the color of the progress bar', async () => {
    await render(TEST_TEMPLATE, {
      declarations: [ColorProgressBarDirective],
      imports: [MatProgressBarModule],
    });

    const $matProgressBar = screen.getByTestId('progress-bar');

    const expectedColor = '--color:#e3ff00;';

    expect($matProgressBar.getAttribute('style')).toEqual(expectedColor);
  });
});
