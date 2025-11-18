import React from 'react'
import { Lazy } from 'aurad'
import { Outlet, RouteObject } from 'react-router-dom'
import { GameRouter } from './views/game/router'

import Dev from './views/dev/router'
import Tool from './views/tool/router'
import Demo from './views/demo/router'
import Other from './views/other/router'
import File from './views/file/router'
import Animation from './views/animation/router'
import Chart from './views/chart/router'
import MutualConversion from './views/mutual-conversion/router'
import Gen from './views/gen/router'
import Server from './views/server/router'

const handle = (conf: any): any[] => {
  return conf.route.map((_: any) => ({
    ..._,
    path: conf.path + _.path,
  }))
}

const OwnChildren = [
  {
    index: true,
    element: import('./views/own'),
  },
  ...handle(Demo),
  ...handle(Other),
  ...handle(File),
  ...handle(Animation),
  ...handle(Chart),
  ...handle(MutualConversion),
  ...handle(Gen),
  ...handle(Server),
  ...handle(Tool),
  ...handle(Dev),
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
        children: GameRouter.map((_) => ({
          ..._,
          element: Lazy(_.element),
        })),
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
