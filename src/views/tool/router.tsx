import React from 'react'
import { Tool } from '.'
import { Lazy } from 'aurad'

export const ToolRouter = {
  path: '/tool',
  element: <Tool />,
  children: [
    {
      path: 'todo-list',
      name: 'Todo List',
      element: Lazy(import('./todo-list')),
      index: true,
    },
    {
      path: 'randomPwd',
      name: '随机密码',
      element: Lazy(import('./random-pwd')),
    },
    {
      path: 'text-compare',
      name: '文本比对',
      'name.en': 'Text Compare',
      element: Lazy(import('./text-compare'))
    },
    {
      path: 'converter/Chinese',
      name: '简繁体转换',
      element: Lazy(import('./converter')),
    },
    {
      path: 'color',
      name: 'Color',
      element: Lazy(import('./color')),
    },
    {
      path: 'box-shadow',
      name: 'Box Shadow',
      element: Lazy(import('./box-shadow')),
    },
    {
      path: 'system-info',
      name: 'System Information',
      element: Lazy(import('./sysInfo')),
    },
  ],
}
