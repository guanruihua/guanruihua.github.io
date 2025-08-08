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
import { StudyChildRouter } from './views/study/router'
import { Lazy } from 'aurad'
import { Container } from './components'

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
        element: Lazy(import('./views/own')),
        children: ToolRouter,
      },
      {
        path: '/tool',
        element: (
          <Container>
            <Outlet />
          </Container>
        ),
        children: ToolRouter,
      },
      {
        path: '/dev',
        element: (
          <Container>
            <Outlet />
          </Container>
        ),
        children: DevRouter,
      },
      {
        path: '/info',
        element: Lazy(import('./views/info')),
      },
      {
        path: '/study',
        element: (
          <Container>
            <Outlet />
          </Container>
        ),
        children: StudyChildRouter,
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
      router={createHashRouter(routes, {
        future: {
          v7_relativeSplatPath: true,
        },
      })}
    />
  )
}

createRoot(document.getElementById('root')!).render(<App />)
