import { Component } from '@angular/core';
import { FLIP_ANIMATION } from 'app/shared/animations/flip.animation';

@Component({
  selector: 'px-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  animations: [FLIP_ANIMATION],
})
export class FlipCardComponent {
  state: string = 'default';

  cardClicked() {
    this.state = this.state === 'default' ? 'flipped' : 'default';
  }
}
