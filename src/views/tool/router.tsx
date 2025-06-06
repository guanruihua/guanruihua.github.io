import React from 'react'
import { Tool } from '.'
import { Lazy } from 'aurad'

export const ToolRouter = {
  path: '/tool',
  element: <Tool />,
  children: [
    {
      path: 'randomPwd',
      name: '随机密码',
      element: Lazy(import('./random-pwd')),
      index: true,
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
      path: 'system-info',
      name: 'System Information',
      element: Lazy(import('./sysInfo')),
    },
  ],
}
