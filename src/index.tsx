import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import { Note } from '@/views'

function App() {
  return (
    <div>
      <Note />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
