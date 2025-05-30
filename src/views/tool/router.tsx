import React from 'react'
import { Tool } from '.'
import { Color } from './color'
import { SystemInfo } from './sysInfo'
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
      path: 'converter/Chinese',
      name: '简繁体转换',
      element: Lazy(import('./converter')),
    },
    {
      path: 'color',
      name: 'Color',
      element: <Color />,
    },
    {
      path: 'system-info',
      name: 'System Information',
      element: <SystemInfo />,
    },

  ],
}
