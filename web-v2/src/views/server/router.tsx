const Route = [
  {
    title: 'WebSocket',
    path: 'webSocket',
    element: import('./webSocket'),
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
  // {
  //   title: 'AI Chat v2',
  //   path: 'ai-chat-v2',
  //   element: import('./ai-chat-v2'),
  // },
  {
    title: 'Platform Api',
    path: 'platform-api',
    element: import('./platform-api'),
  },
]

export default { title: 'Server', name: 'server', path: 'server/', route: Route }
