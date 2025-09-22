import React from 'react'
import { Lazy } from 'aurad'
console.log()

export const AnimationRouter = [
  {
    title: 'Glassmorphic Card with Glow Cursor & Reactive Border',
    path: 'card-beam-animation',
    element: Lazy(import('./Glassmorphic-Card-with-Glow-Cursor')),
  },
  {
    title: 'Fitness Tracking App',
    path: 'fitness-tracking-app',
    element: Lazy(import('./fitness-tracking-app')),
  },
  {
    title: 'Yearly Activity Grid',
    path: 'yearly-activity-grid',
    element: Lazy(import('./yearly-activity-grid')),
  },
  {
    title: 'Animated image slider',
    path: 'animated-image-slider',
    element: Lazy(import('./animated-image-slider')),
  },
  {
    title: 'Projects Carousel',
    path: 'projects-carousel',
    element: Lazy(import('./projects-carousel')),
  },
  {
    title: 'Repetition Image Animation',
    path: 'repetition-image-animation',
    element: Lazy(import('./repetition-image-animation')),
  },
  {
    title: 'Electric Border',
    path: 'electric-border',
    element: Lazy(import('./electric-border')),
  },
  {
    title: 'Carousel + Lightbox + Glow',
    path: 'carousel-lightbox-glow',
    element: Lazy(import('./carousel-lightbox-glow')),
  },
  {
    title: 'Circular Animations Set ',
    path: 'circular-animations-set',
    element: Lazy(import('./circular-animations-set')),
  },
  {
    title: 'Change the color on the 1995 website',
    path: 'change-color',
    element: Lazy(import('./change-color')),
  },
  {
    title: 'Toast Catcher Game',
    path: 'toast-catcher-game',
    element: Lazy(import('./toast-catcher-game')),
  },
  // {
  //   title: 'TEST',
  //   path: 'animation-test-page',
  //   element: Lazy(import('./test')),
  // },
  process.env.NODE_ENV === 'development' && {
    title: 'TEST',
    path: 'animation-test-page',
    element: Lazy(import('./test')),
  },
].filter(Boolean)
