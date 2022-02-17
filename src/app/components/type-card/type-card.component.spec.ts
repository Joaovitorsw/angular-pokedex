import { TypeIconPathPipe } from '@pokedex/pipes';
import { render, screen } from '@testing-library/angular';
import { TypeCardComponent } from './type-card.component';

const DEFAULT_DECLARATIONS = [TypeIconPathPipe];
const DEFAULT_PROPERTY_VALUES = {
  type: 'fire',
};

describe('TypeCardComponent', () => {
  it('should render pokemon type', async () => {
    await render(TypeCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      componentProperties: DEFAULT_PROPERTY_VALUES,
    });

    const $typeCard = screen.getByTestId('type-card');
    expect($typeCard.className).toEqual('fire');
  });

  it('should render type image', async () => {
    await render(TypeCardComponent, {
      declarations: DEFAULT_DECLARATIONS,
      componentProperties: DEFAULT_PROPERTY_VALUES,
    });

    const $typeImage = screen
      .getByTestId('type-card')
      .querySelector('img') as HTMLImageElement;

    const expected = 'assets/images/type-icons/fire.png';
    expect($typeImage.getAttribute('src')).toEqual(expected);
  });
});
