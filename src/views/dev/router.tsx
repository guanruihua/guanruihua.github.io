import React from 'react'
import { Pkg } from '../package'
import { DevPage } from '.'
import { DevHomePage } from './home'

export const DevRouter = {
  path: '/dev',
  element: <DevPage />,
  children: [
    {
      index: true,
      element: <DevHomePage />,
    },
    {
      path: 'pkg',
      element: <Pkg />,
    },
  ],
}
