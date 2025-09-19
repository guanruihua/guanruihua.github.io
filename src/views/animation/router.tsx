import React from 'react'
import { Lazy } from 'aurad'

export const AnimationRouter = [
  {
    title: 'Glassmorphic Card with Glow Cursor & Reactive Border',
    path: 'card-beam-animation',
    element: Lazy(import('./Glassmorphic-Card-with-Glow-Cursor')),
  },
  {
    title: 'Fitness Tracking App',
    path: 'fitness-tracking-app',
    element: Lazy(import('./Fitness-Tracking-App')),
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
    title: 'TEST',
    path: 'animation-test-page',
    element: Lazy(import('./test.3')),
  },
]
