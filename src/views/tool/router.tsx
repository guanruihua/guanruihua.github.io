import React from 'react'
import { Tool } from '.'
import { RandomPwd } from './random-pwd'
import { ConverterChinese } from './converter'
import { Color } from './color'
import { Test } from './test'
import { SystemInfo } from './sysInfo'
import { SelectPage } from './select'

export const ToolRouter = {
  path: '/tool',
  element: <Tool />,
  children: [
    {
      path: 'randomPwd',
      name: '随机密码',
      element: <RandomPwd />,
    },
    {
      path: 'converter/Chinese',
      name: '简繁体转换',
      element: <ConverterChinese />,
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
    {
      path: 'select',
      name: 'Select',
      element: <SelectPage />,
    },
    {
      path: 'test',
      name: 'Test',
      element: <Test />,
    },
  ],
}
