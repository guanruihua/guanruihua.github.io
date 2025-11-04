import React from 'react'
import { Lazy } from 'aurad'

export const ChartRouter = [
  {
    title: 'Bar Stack Border Radius',
    path: 'bar-stack-borderRadius',
    element: Lazy(import('./bar-stack-borderRadius')),
  },
  {
    title: '线性回归图表',
    path: 'base-chart',
    element: Lazy(import('./base-chart'))
  },
  {
    title: '3D柱状图',
    path: 'bar3d-dataset',
    element: Lazy(import('./bar3d-dataset'))
  }
]