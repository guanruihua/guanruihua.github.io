import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'
import { Pkg } from './views/package'
import { Layout } from './layout'
import { Home } from './views/home'
import { Tool } from './views/tool'
import { Dev } from './views/Dev'
import 'aurad/dist/style.css'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/pkg',
        element: <Pkg />
      },
      {
        path: '/tool',
        element: <Tool />
      },
      {
        path: '/dev',
        element: <Dev />
      },
    ]
  }
]

function App() {
  return <RouterProvider router={createHashRouter(routes)} />
}

createRoot(document.getElementById('root')!).render(<App />)
