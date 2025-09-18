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
  }
]
