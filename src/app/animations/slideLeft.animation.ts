import { animate, style, transition, trigger } from '@angular/animations';

const ANIMATION_TIME = (t = 250) => `${t}ms cubic-bezier(.27,.9,.57,1)`;

const slideLeft = trigger('slideLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate(ANIMATION_TIME(), style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate(ANIMATION_TIME(), style({ transform: 'translateX(100%)' }))
  ])
]);

export default slideLeft;
