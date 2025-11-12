import React from 'react'
import { Lazy } from 'aurad'

export const GenRouter = [
  {
    title: '生成二维码',
    path: 'gen-qrcode',
    element: Lazy(import('./qrcode')),
  },
]
