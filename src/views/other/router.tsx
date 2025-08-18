import React from 'react'
import { Lazy } from 'aurad'

export default [
  {
    path: 'http-status',
    element: Lazy(import('./http-status')),
  },
]
