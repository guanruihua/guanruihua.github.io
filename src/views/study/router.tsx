import React from 'react'
import { Lazy } from 'aurad'

export const StudyChildRouter: {
  path: string
  element: React.ReactNode | any
}[] = [
  {
    path: 'study-drag',
    element: Lazy(import('./drag')),
  },
  {
    path: 'demo-text',
    element: Lazy(import('./text/demo')),
  },
  {
    path: 'flow-demo-grid',
    element: Lazy(import('./flow-demo/demo/grid')),
  },
  {
    path: 'minority-html',
    element: Lazy(import('./minority-html')),
  },
  {
    path: 'scroll-bloom',
    element: Lazy(import('./scroll-bloom')),
  },
  {
    path: 'scroll-snap',
    element: Lazy(import('./scroll-snap')),
  },
  {
    path: 'canvas',
    element: Lazy(import('./canvas')),
  },
  {
    path: 'canvas-base-style',
    element: Lazy(import('./canvas/base-style')),
  },
  {
    path: 'select',
    element: Lazy(import('./select')),
  },
  {
    path: 'upload-file-preview',
    element: Lazy(import('./upload-preview')),
  },
  {
    path: 'test',
    element: Lazy(import('./test')),
  },
  {
    path: 'svg',
    element: Lazy(import('./svg')),
  },
  {
    path: 'svg-demo',
    element: Lazy(import('./svg-demo')),
  },
  {
    path: 'css-q-quotes',
    element: Lazy(import('./quotes')),
  },
  {
    path: 'css-flex',
    element: Lazy(import('./css-flex')),
  },
  {
    path: 'css-grid',
    element: Lazy(import('./css-grid')),
  },
  {
    path: 'font-stroke',
    element: Lazy(import('./font-stroke')),
  },
]
