import React from 'react'
import { Leafer } from 'leafer-ui'
// import { demo1 } from './demo/d-1'
import { demo2, demo2_1, demo2_2 } from './demo/d-2'
import 'leafer-game' // 导入动画插件
// import '@leafer-in/editor' // 导入图形编辑器插件
// import { demo0 } from './demo/d-0'

export const usePageState = () => {
  const timer = React.useRef<null | NodeJS.Timeout>(null)

  const load = () => {
    const dom = document.querySelector('.demo__leaferjs .leafer')
    if (!dom) return
    const leafer = new Leafer({ view: dom })
    // demo0(leafer)
    // timer.current = demo1(leafer)
    demo2(leafer)
    demo2_1(leafer)
    demo2_2(leafer)

    return () => {
      leafer.destroy()
      timer.current && clearInterval(timer.current)
    }
  }

  React.useEffect(load, [])
}
