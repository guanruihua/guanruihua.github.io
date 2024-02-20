import React from 'react'
import { createRoot } from 'react-dom/client'
import { Note } from '@/views'
import './index.less'

function App() {
  return (
    <div className='app'>
      <Note />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
