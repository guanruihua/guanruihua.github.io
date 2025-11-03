import React from 'react'
import { Lazy } from 'aurad'

export const OtherRouter = [
  {
    title: 'HTTP 状态码',
    path: 'http-status',
    element: Lazy(import('./http-status')),
  },
  {
    title: 'System Info',
    path: 'system-info',
    element: Lazy(import('./sysInfo')),
  },
  {
    title: 'Setting',
    path: 'setting',
    element: Lazy(import('./setting')),
  },
]
