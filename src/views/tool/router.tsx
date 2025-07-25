import React from 'react'
import { Lazy } from 'aurad'

export const ToolRouter = [
  {
    path: 'ddl',
    element: Lazy(import('./ddl')),
  },
  // {
  //   path: 'todo-list',
  //   element: Lazy(import('./todo-list')),
  // },
  {
    path: 'randomPwd',
    element: Lazy(import('./random-pwd')),
  },
  {
    path: 'ai-chat',
    element: Lazy(import('./ai-chat')),
  },
  {
    path: 'platform-api',
    element: Lazy(import('./platform-api')),
  },
  {
    path: 'calculator',
    element: Lazy(import('./calculator')),
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
