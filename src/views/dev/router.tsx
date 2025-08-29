import React from 'react'
import { Lazy } from 'aurad'

export const DevRouter = [
  {
    path: 'file-review',
    element: Lazy(import('./file-review')),
  },
  {
    path: 'webSocket',
    element: Lazy(import('./webSocket')),
  },
  {
    path: 'color',
    element: Lazy(import('./color')),
  },
  {
    path: 'sse',
    element: Lazy(import('./sse')),
  },

  {
    path: 'vector-data-viewer',
    element: Lazy(import('./vector-data-viewer')),
  },
  {
    path: 'ai-chat',
    element: Lazy(import('./ai-chat')),
  },
  {
    path: 'platform-api',
    element: Lazy(import('./platform-api')),
  },
  {
    path: 'box-shadow',
    element: Lazy(import('./box-shadow')),
  },
  {
    path: 'setting',
    element: Lazy(import('./setting')),
  },
]
