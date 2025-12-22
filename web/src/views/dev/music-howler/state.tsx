import React from 'react'
import { useLoadJS } from '@/hook'

export const usePageState = () => {
  const soundRef = React.useRef<any>()

  useLoadJS(
    '/js/howler.2.2.4.min.js',
    () => {
      const howl = (window as any)?.Howl
      if (!howl) return
      const s = new howl({
        // src: ['audio.mp3', 'audio.ogg'], // 提供多种格式（兼容不同浏览器）
        src: ['/music/tmp.mp3'],
        autoplay: false, // 是否自动播放
        loop: false, // 是否循环
        volume: 0.05, // 音量（0~1）
      })
      soundRef.current = s
    },
    () => {
      soundRef.current?.unload?.()
    },
  )
  return {
    soundRef,
  }
}
