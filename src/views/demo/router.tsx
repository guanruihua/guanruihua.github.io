import React from 'react'
import { Lazy } from 'aurad'

export const DemoRouter = [
  {
    title: 'Card Beam Animation',
    path: 'card-beam-animation',
    element: Lazy(import('./Card-Beam-Animation')),
  },
  {
    title: 'transform 3d',
    path: 'study-transform-3d',
    element: Lazy(import('./transform-3d')),
  },
  {
    title: 'Drag',
    path: 'study-drag',
    element: Lazy(import('./drag')),
  },
  {
    title: '中间省略号 & svg 文本加粗',
    path: 'demo-text',
    element: Lazy(import('./text/demo')),
  },
  {
    title: 'Flow Demo',
    path: 'flow-demo-grid',
    element: Lazy(import('./flow-demo/demo/grid')),
  },
  {
    title: '小众 HTML 标签',
    path: 'minority-html',
    element: Lazy(import('./minority-html')),
  },
  {
    title: '滚动绽放',
    path: 'scroll-bloom',
    element: Lazy(import('./scroll-bloom')),
  },
  {
    title: '整屏滚动',
    path: 'scroll-snap',
    element: Lazy(import('./scroll-snap')),
  },
  {
    title: 'Canvas',
    path: 'canvas',
    element: Lazy(import('./canvas')),
  },
  {
    title: 'Canvas Base Style',
    path: 'canvas-base-style',
    element: Lazy(import('./canvas/base-style')),
  },
  {
    title: 'Select & Drag',
    path: 'select',
    element: Lazy(import('./select')),
  },
  {
    title: 'SVG',
    path: 'svg',
    element: Lazy(import('./svg')),
  },
  {
    title: 'SVG Demo',
    path: 'svg-demo',
    element: Lazy(import('./svg-demo')),
  },
  {
    title: '双引号样式',
    path: 'css-q-quotes',
    element: Lazy(import('./quotes')),
  },
  {
    title: 'Flex',
    path: 'css-flex',
    element: Lazy(import('./css-flex')),
  },
  {
    title: 'Grid',
    path: 'css-grid',
    element: Lazy(import('./css-grid')),
  },
  {
    title: '字体描边',
    path: 'font-stroke',
    element: Lazy(import('./font-stroke')),
  },
  {
    title: 'Test',
    path: 'test',
    element: Lazy(import('./test')),
  },
]
