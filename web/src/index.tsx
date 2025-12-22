import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import 'aurad/dist/style.css'
import { routes } from './router'

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
