import { useSetState } from '0hook'
import React from 'react'
import { Game } from './game'

export const usePageState = () => {
  // const [Phaser, setPhaser] = React.useState<any>(null)
  const [state, setState] = useSetState({})
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return

    const url = '/js/phaser.min.js'

    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      // 设置 worker 路径
      console.log(url, '已加载')
      const Phaser = (window as any).Phaser
      // setPhaser(Phaser)
      Phaser && Game(Phaser, ref.current)
    }
    document.body.appendChild(script)

    return () => {
      // 组件卸载时移除 script
      document.body.removeChild(script)
    }
  }, [ref.current])

  return {
    ref,
    state,
    setState,
  }
}
