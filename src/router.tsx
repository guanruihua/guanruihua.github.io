import React from 'react'
import { Outlet, RouteObject } from 'react-router-dom'
import { ToolRouter } from './views/tool/router'
import { DevRouter } from './views/dev/router'
import { DemoRouter } from './views/demo/router'
import { Lazy } from 'aurad'
import { OtherRouter } from './views/other/router'
import { GameRouter } from './views/game/router'
import { FileRouter } from './views/file/router'
import { AnimationRouter } from './views/animation/router'
import { ChartRouter } from './views/chart/router'
import { MutualConversionRouter } from './views/mutual-conversion/router'
import { GenRouter } from './views/gen/router'

const OwnChildren = [
  {
    index: true,
    element: import('./views/own'),
  },
  ...ToolRouter.map((_) => ({
    ..._,
    path: 'tool/' + _.path,
  })),
  ...OtherRouter.map((_) => ({
    ..._,
    path: 'other/' + _.path,
  })),
  ...DevRouter.map((_) => ({
    ..._,
    path: 'dev/' + _.path,
  })),
  ...FileRouter.map((_) => ({
    ..._,
    path: 'file/' + _.path,
  })),
  ...AnimationRouter.map((_: any) => ({
    ..._,
    path: 'animation/' + _.path,
  })),
  ...MutualConversionRouter.map((_: any) => ({
    ..._,
    path: 'mutual-conversion/' + _.path,
  })),
  ...DemoRouter.map((_) => ({
    ..._,
    path: 'demo/' + _.path,
  })),
  ...ChartRouter.map((_) => ({
    ..._,
    path: 'chart/' + _.path,
  })),
  ...GenRouter.map((_) => ({
    ..._,
    path: 'gen/' + _.path,
  })),
  {
    path: '*',
    element: import('./views/own'),
  },
].map((_) => ({
  ..._,
  element: Lazy(_.element),
}))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: Lazy(import('./layout')),
    children: [
      {
        index: true,
        element: Lazy(import('./views/home')),
      },
      {
        path: '/own',
        element: Lazy(import('./views/own/layout')),
        children: OwnChildren,
      },
      {
        path: '/game',
        element: <Outlet />,
        children: [
          ...GameRouter.map((_) => ({
            ..._,
            // path: 'game/' + _.path,
          })),
        ],
      },
      {
        path: '/info',
        element: Lazy(import('./views/info')),
      },
      {
        path: '/packages',
        element: Lazy(import('./views/package')),
      },
      {
        path: '*',
        element: Lazy(import('./views/home')),
      },
    ],
  },
]
