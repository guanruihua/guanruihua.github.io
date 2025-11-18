const Route = [
  {
    title: 'Bar Stack Border Radius',
    path: 'bar-stack-borderRadius',
    element: import('./bar-stack-borderRadius'),
  },
  {
    title: '线性回归图表',
    path: 'base-chart',
    element: import('./base-chart'),
  },
  {
    title: '3D柱状图',
    path: 'bar3d-dataset',
    element: import('./bar3d-dataset'),
  },
]

export default { title: 'Chart', name: 'chart', path: 'chart/', route: Route }
