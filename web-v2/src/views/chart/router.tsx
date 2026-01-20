const Route = [
  {
    title: '用户旅程图',
    path: 'mermaid-user-journey',
    element: import('./mermaid/modules/user-journey'),
  },
  {
    title: 'Mermaid / Flowchart',
    path: 'mermaid-flowchart',
    element: import('./mermaid/modules/flowchart'),
  },
  {
    title: 'Mermaid',
    path: 'mermaid',
    element: import('./mermaid'),
  },
  {
    title: 'Diagrams',
    path: 'diagram',
    element: import('./diagram'),
  },
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
