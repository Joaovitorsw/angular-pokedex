import { render, screen } from '@testing-library/angular';
import { ColorProgressBarWidgetModule } from './color-progress-bar.widget.module';

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
      imports: [ColorProgressBarWidgetModule],
    });

    const $matProgressBar = screen.getByTestId('progress-bar');

    const expectedColor = '--color:#e3ff00;';

    expect($matProgressBar.getAttribute('style')).toEqual(expectedColor);
  });
});
