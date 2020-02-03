import { trigger, transition, style, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
    transition('void => *', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
    ])
]);

export const fadeOut = trigger('fadeOut', [
    transition('* => void', [
        style({ opacity: 1 }),
        animate(250, style({ opacity: 0 }))
    ])
]);