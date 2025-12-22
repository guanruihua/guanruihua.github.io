import React from 'react'
import { useInit } from '@/hook'

export default function () {
  const ref = React.useRef<HTMLTextAreaElement | null>(null)
  const [state, setState] = React.useState({})

  useInit(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entries) => {
      // entries 包含所有被观察元素的尺寸信息
      entries.forEach((entry) => {
        // entry.contentRect 包含元素的宽高、位置等
        console.log('新尺寸:', entry.contentRect)
        setState(entry.contentRect)
        // 可以在这里调整子元素布局或重绘图表
      })
    })

    // 开始监听指定元素
    observer.observe(ref.current)
    return () => {
      ref.current && observer.unobserve(ref.current)
    }
  }, [ref.current])

  return (
    <div className="demo__ResizeObserver">
      <pre>新尺寸: {JSON.stringify(state, null, 2)}</pre>
      <textarea
        ref={ref}
        style={{
          maxHeight: 300,
          minWidth: 400,
        }}
      />
    </div>
  )
}
