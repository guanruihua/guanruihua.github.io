export const Route = [
  {
    title: '生成二维码',
    path: 'gen-qrcode',
    element: (import('./qrcode')),
  },
]

export default { title: 'Gen', name: 'gen', path: 'gen/', route: Route }
