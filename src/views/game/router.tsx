import React from 'react'
import { Lazy } from 'aurad'

export const GameRouter = [
  {
    path: 'g-2048',
    element: Lazy(import('./2048')),
  },
]
