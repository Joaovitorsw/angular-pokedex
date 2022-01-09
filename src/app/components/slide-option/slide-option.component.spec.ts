import { MatIconModule } from '@angular/material/icon';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SlideOptionComponent } from './slide-option.component';

const DEFAULT_IMPORTS = [MatSlideToggleModule, MatIconModule];
const DEFAULT_PROPERTIES = {
  option: 'Animation',
  icon: 'movie_creation',
};

describe('SlideOptionComponent', () => {
  it('emit MatSlideToggleChange change event', async () => {
    await render(SlideOptionComponent, {
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        ...DEFAULT_PROPERTIES,
        changeOption(event: MatSlideToggleChange) {
          expect(event.checked).toBe(true);
        },
      },
    });

    const $slideOption = screen.getByTestId('slide-option');
    const $input = $slideOption.querySelector('input') as HTMLInputElement;

    userEvent.click($input);
  });

  it('emit @Output change event', async () => {
    const changeSpy = jasmine.createSpy('change');

    await render(SlideOptionComponent, {
      imports: DEFAULT_IMPORTS,
      componentProperties: {
        ...DEFAULT_PROPERTIES,
        change: {
          emit: changeSpy,
        } as any,
        changeOption(event: MatSlideToggleChange) {
          this.change!.emit(event);
          expect(changeSpy).toHaveBeenCalled();
        },
      },
    });

    const $slideOption = screen.getByTestId('slide-option');
    const $input = $slideOption.querySelector('input') as HTMLInputElement;

    userEvent.click($input);
  });
});
