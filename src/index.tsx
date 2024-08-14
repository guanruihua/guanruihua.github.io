import React from 'react'
import { createRoot } from 'react-dom/client'
import { Note } from '@/views'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'
import { Pkg } from './views/package'
import { Layout } from './layout'
import { Home } from './views/home'
import 'aurad/dist/style.css'
import { Tool } from './views/tool'

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
        path: '/note',
        element: <Note />
      },
      {
        path: '/pkg',
        element: <Pkg />
      },
      {
        path: '/tool',
        element: <Tool />
      }
    ]
  }
]

function App() {
  return <RouterProvider router={createHashRouter(routes)} />
}

createRoot(document.getElementById('root')!).render(<App />)
