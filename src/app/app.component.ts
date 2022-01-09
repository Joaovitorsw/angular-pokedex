import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { Container } from 'ng-particles';
import { AboutPage } from './pages/about/about.page';
import { HomePage } from './pages/home/home.page';
import { SLIDE_IN_ANIMATION } from './shared/animations/slide.animation';

@Component({
  selector: 'px-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [SLIDE_IN_ANIMATION],
})
export class AppComponent {
  private container: Container;
  animationStatus = true;

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  onActivate(event: HomePage | AboutPage) {
    const eventContainer = event.particlesEvent;
    eventContainer.subscribe((container: Container) => {
      this.container = container;
      this.particlesStatus(this.animationStatus);
    });
  }

  slideStatus(event: MatSlideToggleChange) {
    this.animationStatus = event.checked;
    this.particlesStatus(this.animationStatus);
  }

  private particlesStatus(state: boolean) {
    const method = state ? 'refresh' : 'stop';
    this.container[method]();
  }
}
