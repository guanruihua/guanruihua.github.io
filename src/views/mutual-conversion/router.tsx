import React from 'react'
import { Lazy } from 'aurad'

export const MutualConversionRouter = [
  {
    title: 'Unicode, 中文, 多种格式的相互转换',
    path: 'unicode-and-chinese',
    element: Lazy(import('./unicode-and-chinese')),
  },
  {
    title: '简繁体转换',
    path: 'converter-Chinese',
    element: Lazy(import('./converter')),
  },
  {
    title: '时间格式转换',
    path: 'time-format',
    element: Lazy(import('./time-format')),
  },
  {
    title: '单位转换',
    path: 'unit-conversion',
    element: Lazy(import('./unit-conversion')),
  },
]
