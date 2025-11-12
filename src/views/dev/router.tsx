import React from 'react'

export const DevRouter = [
  // {
  //   title: 'codesandbox',
  //   path: 'codesandbox',
  //   element: (import('./codesandbox'))
  // },
  {
    title: 'HTML to React',
    path: 'html-to-react',
    element: import('./html-to-react'),
  },
  {
    title: 'WebSocket',
    path: 'webSocket',
    element: import('./webSocket'),
  },
  {
    title: 'Color',
    path: 'color',
    element: import('./color'),
  },
  {
    title: 'SSE',
    path: 'sse',
    element: import('./sse'),
  },

  {
    title: 'Vector Data Viewer',
    path: 'vector-data-viewer',
    element: import('./vector-data-viewer'),
  },
  {
    title: 'AI Chat',
    path: 'ai-chat',
    element: import('./ai-chat'),
  },
  {
    title: 'Platform Api',
    path: 'platform-api',
    element: import('./platform-api'),
  },
  {
    title: 'Box Shadow',
    path: 'box-shadow',
    element: import('./box-shadow'),
  },

  {
    title: '画布(tldraw)',
    path: 'tldraw',
    element: import('./tldraw'),
    blank: true,
  },
  {
    title: '手绘白板(excalidraw)',
    path: 'excalidraw',
    element: import('./excalidraw'),
  },
  {
    title: 'music-howler',
    path: 'music-howler',
    element: import('./music-howler'),
  },
]
