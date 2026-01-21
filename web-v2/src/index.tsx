import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import 'aurad/dist/style.css'
import { routes } from './router'
import { ConfigProvider, theme } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <RouterProvider
        // future={{
        //   v7_startTransition: true,
        // }}
        router={createHashRouter(routes)}
      />
    </ConfigProvider>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
