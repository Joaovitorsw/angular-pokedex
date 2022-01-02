import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { Container } from 'ng-particles';
import { AboutPage } from './pages/about/about.page';
import { HomePage } from './pages/home/home.page';
import { slideInAnimation } from './shared/animations/slide.animation';

@Component({
  selector: 'px-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  private container: Container;
  states = true;

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  onActivate(event: HomePage | AboutPage) {
    const container = event.particlesEvent;
    container.subscribe((container: Container) => {
      this.container = container;
      this.animationStates(this.states);
    });
  }

  slideStatus(event: MatSlideToggleChange) {
    this.states = event.checked;
    this.animationStates(this.states);
  }

  animationStates(state: boolean) {
    const method = state ? 'refresh' : 'stop';
    this.container[method]();
  }
}
