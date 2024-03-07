import React from 'react'
import { createRoot } from 'react-dom/client'
import { Note } from '@/views'
import './index.less'

function App() {
  function isBackgroundImageRendered(element: any) {
    const backgroundImage: string =
      getComputedStyle(element).backgroundImage || ''
    const ms = backgroundImage.match(/url\(["']?(.*?)["']?\)/)
    if (!Array.isArray(ms) || ms.length < 1) {
      return Promise.resolve(false)
    }
    const imageUrl = ms[1]

    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = function () {
        resolve(true)
      }

      img.onerror = function () {
        resolve(false)
      }

      img.src = imageUrl
    })
  }

  const init = async () => {
    const element = document.querySelector('body')
    isBackgroundImageRendered(element)
      .then((isRendered) => {
        if (isRendered) {
          console.log('背景图片渲染成功')
        } else {
          console.log('背景图片渲染失败')
          if (element) {
            element.style.backgroundImage =
              'url(https://unpkg.com/0static/img/2024-02-20.jpeg)'
          }
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  React.useEffect(() => {
    init()
  }, [])

  return (
    <div className="app">
      <Note />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
