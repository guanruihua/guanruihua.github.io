import React from 'react'
import { Lazy } from 'aurad'

export const ToolRouter = [
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
    title: 'PDF 生成',
    path: 'pdf-gen',
    element: Lazy(import('./pdf-gen')),
  },
  {
    title: '轻量级图片裁剪',
    path: 'img-clipper',
    element: Lazy(import('./img-clipper')),
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
    title: '随机密码',
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
    title: 'System Info',
    path: 'system-info',
    element: Lazy(import('./sysInfo')),
  },
]
