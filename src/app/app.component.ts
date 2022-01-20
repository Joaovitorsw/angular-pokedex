import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { Container } from 'ng-particles';
import { catchError } from 'rxjs/operators';
import { AboutPage } from './pages/about/about.page';
import { HomePage } from './pages/home/home.page';
import { IndexedDbService } from './services';
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
  resetStatus = false;

  constructor(private indexDB: IndexedDbService) {}

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

  resetCache(event: MatSlideToggleChange) {
    this.resetStatus = event.checked;
    this.indexDB
      .clearAll()
      .pipe(catchError(() => this.indexDB.clearAll()))
      .subscribe(() => {
        window.location.reload();
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
