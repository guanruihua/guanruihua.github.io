import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'
import './index.less'
import 'aurad/dist/style.css'
import { ToolRouter } from './views/tool/router'
import { DevRouter } from './views/dev/router'
import { StudyChildRouter } from './views/study/router'
import { Lazy } from 'aurad'
import otherRouter from './views/other/router'
import { GameRouter } from './views/game/router'

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
            element: Lazy(import('./views/own/index')),
          },

          ...ToolRouter.map((_) => ({
            ..._,
            path: 'tool/' + _.path,
          })),
          ...otherRouter.map((_) => ({
            ..._,
            path: 'other/' + _.path,
          })),
          ...DevRouter.map((_) => ({
            ..._,
            path: 'dev/' + _.path,
          })),
          ...StudyChildRouter.map((_) => ({
            ..._,
            path: 'study/' + _.path,
          })),
          ...GameRouter.map((_) => ({
            ..._,
            path: 'game/' + _.path,
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
