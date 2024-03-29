import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SLIDE_IN_ANIMATION = trigger('routeAnimations', [
  transition('HomePage <=> AboutPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    group([
      query(':leave', [animate('500ms ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('500ms ease-out', style({ left: '0%' }))]),
    ]),
  ]),
]);
