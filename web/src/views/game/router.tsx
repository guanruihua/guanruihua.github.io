export const GameRouter = [
  {
    title: '2048',
    path: 'g-2048',
    element: import('./2048'),
  },
  {
    title: 'PVZ( beta / dev)',
    path: 'pvz',
    element: import('./pvz'),
  },
  {
    // title:'打砖块',
    title: 'Break bricks',
    path: 'brick',
    element: import('./brick'),
  },
]
