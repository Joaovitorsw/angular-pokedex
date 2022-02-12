import { MatIconModule } from '@angular/material/icon';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FlipCardComponent } from './flip-card.component';

const DEFAULT_IMPORTS = [MatIconModule];
describe('FlipCardComponent', () => {
  it('should update card state ', async () => {
    await render(FlipCardComponent, {
      imports: DEFAULT_IMPORTS,
    });
    const $flipButton = screen.getByTestId('flip-button');
    const $faceBack = screen.getByTestId('face-back');
    userEvent.click($flipButton);

    const sample = $faceBack.classList.contains('hidden');
    expect(sample).toBe(true);
  });
});
