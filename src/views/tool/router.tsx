import React from 'react'
import { Lazy } from 'aurad'

export const ToolRouter = [
  // {
  //   title: '时间 / 时间戳转换',
  //   path: 'timestamp',
  //   element: Lazy(import('./timestamp')),
  // },
  {
    title: 'URL 解析',
    path: 'url-analysis',
    element: Lazy(import('./url-analysis')),
  },
  {
    title: 'Unicode转文本',
    path: 'Unicode2Text',
    element: Lazy(import('./Unicode2Text')),
  },
  {
    title: 'HTML转义',
    path: 'HTML-escape',
    element: Lazy(import('./HTMLescape')),
  },
  {
    title: 'MD5加密',
    path: 'md5',
    element: Lazy(import('./md5')),
  },
  {
    title: 'UUID 生成',
    path: 'uuid-gen',
    element: Lazy(import('./uuid-gen')),
  },
  {
    title: '时间格式转换',
    path: 'time-format',
    element: Lazy(import('./time-format')),
  },

  {
    title: 'DDL',
    path: 'ddl',
    element: Lazy(import('./ddl')),
  },
  // {
  //  title: 'Todo List',
  //   path: 'todo-list',
  //   element: Lazy(import('./todo-list')),
  // },
  {
    title: '计算器',
    path: 'calculator',
    element: Lazy(import('./calculator')),
  },

  {
    title: '随机密码/字符串',
    path: 'randomPwd',
    element: Lazy(import('./random-pwd')),
  },

  {
    title: '子串比对',
    path: 'text-compare',
    element: Lazy(import('./text-compare')),
  },
  {
    title: '简繁体转换',
    path: 'converter/Chinese',
    element: Lazy(import('./converter')),
  },
  {
    title: '冷暖色分析工具',
    path: 'color-analysis-warm-cold',
    element: Lazy(import('./color-analysis-warm-cold'))
  },
  {
    title: 'bpmn',
    path: 'bpmn',
    element: Lazy(import('./bpmn'))
  },
]
