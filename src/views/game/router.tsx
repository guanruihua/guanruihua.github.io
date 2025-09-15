import React from 'react'
import { Lazy } from 'aurad'

export const GameRouter = [
  {
    title:'2048',
    path: 'g-2048',
    element: Lazy(import('./2048')),
  },
  {
    title:'PVZ( beta / dev)',
    path: 'pvz',
    element: Lazy(import('./pvz')),
  },
  {
    // title:'打砖块',
    title:'Break bricks',
    path: 'brick',
    element: Lazy(import('./brick')),
  },
]
