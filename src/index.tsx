import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'
import { Pkg } from './views/package'
import { Layout } from './layout'
import { Home } from './views/home'
import './index.less'
import 'aurad/dist/style.css'
import { ToolRouter } from './views/tool/router'
import { Info } from './views/info'
import { StudyRouter } from './views/study/router'
import { Sandbox } from './views/sandbox'
import { DevRouter } from './views/dev/router'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/pkg',
        element: <Pkg />,
      },
      ToolRouter,
      {
        path: '/info',
        element: <Info />,
      },
      {
        path: '/sandbox',
        element: <Sandbox />,
      },
      StudyRouter,
      DevRouter,
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
