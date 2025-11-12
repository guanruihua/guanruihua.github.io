import React from 'react'

export const OtherRouter = [
  {
    title: 'HTTP 状态码',
    path: 'http-status',
    element: import('./http-status'),
  },
  {
    title: 'System Info',
    path: 'system-info',
    element: import('./sysInfo'),
  },
  {
    title: 'Setting',
    path: 'setting',
    element: import('./setting'),
  },
]
