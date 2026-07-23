export const Route = [
  {
    title: 'canvas生成视频',
    path: 'gen-video',
    element: import('./video'),
  },
  {
    title: '生成二维码',
    path: 'gen-qrcode',
    element: import('./qrcode'),
  },
]

export default { title: 'Gen', name: 'gen', path: 'gen/', route: Route }
