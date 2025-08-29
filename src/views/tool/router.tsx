import React from 'react'
import { Lazy } from 'aurad'

export const ToolRouter = [
    {
    path: 'img-clipper',
    element: Lazy(import('./img-clipper')),
  },
  {
    path: 'ddl',
    element: Lazy(import('./ddl')),
  },
  // {
  //   path: 'todo-list',
  //   element: Lazy(import('./todo-list')),
  // },

  {
    path: 'calculator',
    element: Lazy(import('./calculator')),
  },

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
    path: 'system-info',
    element: Lazy(import('./sysInfo')),
  },
]
