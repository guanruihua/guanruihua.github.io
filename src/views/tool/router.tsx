import React from 'react'
import { Lazy } from 'aurad'

export const ToolRouter = [
  // {
  //   path: 'ddl',
  //   name: 'DDL',
  //   element: Lazy(import('./ddl')),
  //   index: true,
  // },
  // {
  //   path: 'todo-list',
  //   name: 'Todo List',
  //   element: Lazy(import('./todo-list')),
  //   index: true,
  // },
  {
    path: 'randomPwd',
    element: Lazy(import('./random-pwd')),
  },
  {
    path: 'text-compare',
    element: Lazy(import('./text-compare')),
  },
  {
    path: 'converter/Chinese',
    element: Lazy(import('./converter')),
  },
  {
    path: 'color',
    element: Lazy(import('./color')),
  },
  {
    path: 'box-shadow',
    element: Lazy(import('./box-shadow')),
  },
  {
    path: 'system-info',
    element: Lazy(import('./sysInfo')),
  },
]
