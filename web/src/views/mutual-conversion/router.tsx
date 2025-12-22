export const Route = [
  {
    title: 'Unicode, 中文, 多种格式的相互转换',
    path: 'unicode-and-chinese',
    element: import('./unicode-and-chinese'),
  },
  {
    title: '简繁体转换',
    path: 'converter-Chinese',
    element: import('./converter'),
  },
  {
    title: '时间格式转换',
    path: 'time-format',
    element: import('./time-format'),
  },
  {
    title: '单位转换',
    path: 'unit-conversion',
    element: import('./unit-conversion'),
  },
  {
    title: '摩斯电码转换',
    path: 'morse-code',
    element: import('./morse-code'),
  }
]

export default {
  title: 'Conversion',
  name: 'mutual-conversion',
  path: 'mutual-conversion/',
  route: Route,
}
