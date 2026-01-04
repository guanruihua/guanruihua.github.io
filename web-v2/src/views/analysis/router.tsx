const Route = [
  // {
  //   title: 'codesandbox',
  //   path: 'codesandbox',
  //   element: (import('./codesandbox'))
  // },
  {
    title: 'Hot',
    path: 'hot',
    element: import('./hot'),
  },
]

export default { title: 'Analysis', name: 'analysis', path: 'analysis/', route: Route }
