import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'
import { Pkg } from './views/package'
import { Layout } from './layout'
import { Home } from './views/home'
import { Dev } from './views/Dev'
import 'aurad/dist/style.css'
import { ToolRouter } from './views/tool/router'

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
        path: '/dev',
        element: <Dev />,
      },
    ],
  },
]

function App() {
  return (
    <RouterProvider
      router={createHashRouter(routes, {
        future: {
          // v7_startTransition: true,
          v7_relativeSplatPath: true,
        },
      })}
    />
  )
}

createRoot(document.getElementById('root')!).render(<App />)
