import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SLIDE_IN_ANIMATION } from './shared/animations';

@Component({
  selector: 'px-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [SLIDE_IN_ANIMATION],
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
