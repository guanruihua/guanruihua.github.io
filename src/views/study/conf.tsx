import React from 'react'
import { Lazy } from 'aurad'

export const conf: {
  group?: string
  label?: string
  path: string
  name: string
  element: React.ReactNode | any
}[] = [
  {
    path: 'canvas',
    name: 'Canvas Base Draw',
    element: Lazy(import('./canvas')),
  },
  {
    path: 'canvas-base-style',
    name: 'Canvas Base Style',
    element: Lazy(import('./canvas/base-style')),
  },
  {
    path: 'select',
    name: 'Select',
    element: Lazy(import('./select')),
  },
  {
    path: 'upload-file-preview',
    name: 'Upload File Preview',
    element: Lazy(import('./upload-preview')),
  },
  {
    path: 'test',
    name: 'Test',
    element: Lazy(import('./test')),
  },
  {
    group: 'demo',
    path: 'demo-svg',
    name: 'Svg',
    element: Lazy(import('./svg')),
  },
  {
    group: 'css',
    path: 'css-q-quotes',
    name: '双引号样式',
    element: Lazy(import('./quotes')),
  },
  {
    group: 'css',
    path: 'css-flex',
    name: 'CSS flex',
    element: Lazy(import('./css-flex')),
  },
  {
    group: 'css',
    path: 'css-grid',
    name: 'grid',
    element: Lazy(import('./css-grid')),
  },
  {
    group: 'demo',
    path: 'font-stroke',
    name: '字体描边',
    element: Lazy(import('./font-stroke')),
  },
]
