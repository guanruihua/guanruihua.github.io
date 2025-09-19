import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  Outlet,
  RouteObject,
  RouterProvider,
  createHashRouter,
} from 'react-router-dom'
import './index.less'
import 'aurad/dist/style.css'
import { ToolRouter } from './views/tool/router'
import { DevRouter } from './views/dev/router'
import { DemoRouter } from './views/demo/router'
import { Lazy } from 'aurad'
import { OtherRouter } from './views/other/router'
import { GameRouter } from './views/game/router'
import { FileRouter } from './views/file/router'
import { AnimationRouter } from './views/animation/router'

const routes: RouteObject[] = [
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
        children: [
          {
            index: true,
            element: Lazy(import('./views/own')),
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
          ...AnimationRouter.map((_) => ({
            ..._,
            path: 'animation/' + _.path,
          })),
          ...DemoRouter.map((_) => ({
            ..._,
            path: 'demo/' + _.path,
          })),
          {
            path: '*',
            element: Lazy(import('./views/own')),
          },
        ],
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

function App() {
  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={createHashRouter(routes)}
    />
  )
}

createRoot(document.getElementById('root')!).render(<App />)
