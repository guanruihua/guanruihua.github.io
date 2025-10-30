import React from 'react'
import { Lazy } from 'aurad'

export const ChartRouter = [
  {
    title: 'Bar Stack Border Radius',
    path: 'bar-stack-borderRadius',
    element: Lazy(import('./bar-stack-borderRadius')),
  },
]