import React from 'react'
import { App, Leafer } from 'leafer-ui'
import { Editor } from '@leafer-in/editor'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import { demo0 } from './demo/d-0'

export const usePageState = () => {
  const timer = React.useRef<null | NodeJS.Timeout>(null)

  const load = () => {
    const dom = document.querySelector('.demo__leaferjs-editor .leafer')
    if (!dom) return
    const app = new App({
      view: dom,
      fill: '#333',
      // editor: {}, //  配置 editor 会自动创建并添加 app.editor 实例、tree 层、sky 层
    })
    app.add((app.tree = new Leafer({ type: 'design' })))
    app.add((app.sky = new Leafer()))

    demo0(app)

    app.sky.add((app.editor = new Editor()))

    return () => {
      app.destroy()
      timer.current && clearInterval(timer.current)
    }
  }

  React.useEffect(load, [])
}
