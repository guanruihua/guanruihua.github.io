import React from 'react'

export const AnimationRouter = [
  {
    title: 'swipe effect',
    path: 'swipe-effect',
    element: import('./swipe-effect'),
  },
  {
    title: 'Monochrome',
    path: 'monochrome',
    element: import('./monochrome'),
  },
  {
    title: 'Glassmorphic Card with Glow Cursor & Reactive Border',
    path: 'glassmorphic-card',
    element: import('./glassmorphic-card'),
  },
  {
    title: 'Fitness Tracking App',
    path: 'fitness-tracking-app',
    element: import('./fitness-tracking-app'),
  },
  {
    title: 'Yearly Activity Grid',
    path: 'yearly-activity-grid',
    element: import('./yearly-activity-grid'),
  },
  {
    title: 'Animated image slider',
    path: 'animated-image-slider',
    element: import('./animated-image-slider'),
  },
  {
    title: 'Projects Carousel',
    path: 'projects-carousel',
    element: import('./projects-carousel'),
  },
  {
    title: 'Repetition Image',
    path: 'repetition-image',
    element: import('./repetition-image'),
  },
  {
    title: 'Electric Border',
    path: 'electric-border',
    element: import('./electric-border'),
  },
  {
    title: 'Carousel + Lightbox + Glow',
    path: 'carousel-lightbox-glow',
    element: import('./carousel-lightbox-glow'),
  },
  {
    title: 'Circular Animations Set ',
    path: 'circular-animations-set',
    element: import('./circular-animations-set'),
  },
  {
    title: 'Change the color on the 1995 website',
    path: 'change-color',
    element: import('./change-color'),
  },
  {
    title: 'Toast Catcher Game',
    path: 'toast-catcher-game',
    element: import('./toast-catcher-game'),
  },
  // {
  //   title: 'TEST',
  //   path: 'animation-test-page',
  //   element: (import('./test')),
  // },
  process.env.NODE_ENV === 'development' && {
    title: 'TEST',
    path: 'animation-test-page',
    element: import('./test'),
  },
].filter(Boolean)
