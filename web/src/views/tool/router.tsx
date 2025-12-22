export const Route = [
  // {
  //   title: '时间 / 时间戳转换',
  //   path: 'timestamp',
  //   element: (import('./timestamp')),
  // },
  {
    title: 'URL 解析',
    path: 'url-analysis',
    element: import('./url-analysis'),
  },
  {
    title: 'HTML转义',
    path: 'HTML-escape',
    element: import('./HTMLescape'),
  },
  {
    title: 'MD5加密',
    path: 'md5',
    element: import('./md5'),
  },
  {
    title: 'UUID 生成',
    path: 'uuid-gen',
    element: import('./uuid-gen'),
  },

  {
    title: 'DDL',
    path: 'ddl',
    element: import('./ddl'),
  },
  // {
  //  title: 'Todo List',
  //   path: 'todo-list',
  //   element: (import('./todo-list')),
  // },
  {
    title: '计算器',
    path: 'calculator',
    element: import('./calculator'),
  },

  {
    title: '随机密码/字符串',
    path: 'randomPwd',
    element: import('./random-pwd'),
  },

  {
    title: '子串比对',
    path: 'text-compare',
    element: import('./text-compare'),
  },

  {
    title: '冷暖色分析工具',
    path: 'color-analysis-warm-cold',
    element: import('./color-analysis-warm-cold'),
  },
  {
    title: '业务流程图(bpmn)',
    path: 'bpmn',
    element: import('./bpmn'),
  },
]

export default { title: 'Tool', name: 'tool', path: 'tool/', route: Route }
