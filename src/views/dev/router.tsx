import React from 'react'
import { Lazy } from 'aurad'

export const DevRouter = [
  {
    title: 'HTML to React',
    path: 'html-to-react',
    element: Lazy(import('./html-to-react')),
  },
  {
    title: 'WebSocket',
    path: 'webSocket',
    element: Lazy(import('./webSocket')),
  },
  {
    title: 'Color',
    path: 'color',
    element: Lazy(import('./color')),
  },
  {
    title: 'SSE',
    path: 'sse',
    element: Lazy(import('./sse')),
  },

  {
    title: 'Vector Data Viewer',
    path: 'vector-data-viewer',
    element: Lazy(import('./vector-data-viewer')),
  },
  {
    title: 'AI Chat',
    path: 'ai-chat',
    element: Lazy(import('./ai-chat')),
  },
  {
    title: 'Platform Api',
    path: 'platform-api',
    element: Lazy(import('./platform-api')),
  },
  {
    title: 'Box Shadow',
    path: 'box-shadow',
    element: Lazy(import('./box-shadow')),
  },
  {
    title: 'Setting',
    path: 'setting',
    element: Lazy(import('./setting')),
  },
  {
    title: 'tldraw',
    path: 'tldraw',
    element: Lazy(import('./tldraw')),
  },
  {
    title: 'excalidraw',
    path: 'excalidraw',
    element: Lazy(import('./excalidraw')),
  },
  {
    title: 'music-howler',
    path: 'music-howler',
    element: Lazy(import('./music-howler')),
  },
]
