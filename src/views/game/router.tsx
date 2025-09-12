import React from 'react'
import { Lazy } from 'aurad'

export const GameRouter = [
  {
    title:'2048',
    path: 'g-2048',
    element: Lazy(import('./2048')),
  },
  {
    title:'PVZ',
    path: 'pvz',
    element: Lazy(import('./pvz')),
  },
]
