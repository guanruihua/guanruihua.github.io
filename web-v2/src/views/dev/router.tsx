const Route = [
  {
    title: 'Date',
    path: 'dev-date',
    element: import('./date'),
  },
  {
    title: 'JSON Table',
    path: 'json-table',
    element: import('./json-table'),
  },
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
    title: 'Color',
    path: 'color',
    element: import('./color'),
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
  // {
  //   title: '手绘白板(excalidraw)',
  //   path: 'excalidraw',
  //   element: import('./excalidraw'),
  // },
  {
    title: 'music-howler',
    path: 'music-howler',
    element: import('./music-howler'),
  },
  {
    title: 'Demo',
    path: 'demo',
    element: import('./demo'),
  },
]

export default { title: 'Dev', name: 'dev', path: 'dev/', route: Route }
