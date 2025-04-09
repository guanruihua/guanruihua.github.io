import React from 'react'
import { Tool } from '.'
import { RandomPwd } from './random-pwd'
import { ConverterChinese } from './converter'

export const ToolRouter = {
  path: '/tool',
  element: <Tool />,
  children: [
    {
      path: 'randomPwd',
      element: <RandomPwd />,
    },
    {
      path: 'converter/Chinese',
      element: <ConverterChinese />,
    },
  ],
}
