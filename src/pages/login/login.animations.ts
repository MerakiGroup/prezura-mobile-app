import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

export const animations = [
  trigger('fadeOut', [
    state('true', style({
      opacity: 0
    })),
    transition('void => *', [
      style({ opacity: 1 }),
      animate('1000ms 0ms ease-in')
    ])
  ]),

  trigger('fadeIn', [
    state('true', style({
      opacity: 1
    })),
    transition('void => *', [
      style({ opacity: 0 }),
      animate('1000ms 0ms ease-in')
    ])
  ]),

  trigger('zoomOut', [
    state('true', style({
      transform: 'translate(0px,80px) scale(0.7,0.7) ',
    })),
    transition('* => *', [
      style({
        opacity: 0
      }),
      animate('1500ms 0ms ease-out')
    ])
  ]),

  trigger('zoomIn', [
    state('true', style({
      transform: 'scale(1.2,1.2)'
    })),
    transition('void => *', [
      style({ opacity: 0 }),
      animate('1500ms 500ms ease-in')
    ])
  ])
];
