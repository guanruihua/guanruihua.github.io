import React from 'react'
import { useInit } from '@/hook'

export default function () {
  const [state, setState] = React.useState(false)

  useInit(() => {
    // 创建一个观察器实例
    // entries 是所有被观察元素的状态集合
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        console.log('🚀 ~ entry:', entry)

        // 判断元素是否进入视口（可见）
        if (entry.isIntersecting) {
          const img = entry.target // 获取当前图片元素
          // 将 data-src 中的真实图片地址赋给 src，开始加载
          img.src = img.dataset.src

          // 加载完成后，停止观察，避免重复触发
          observer.unobserve(img)
          setState(true)
        }
      })
    })

    // // 找到所有带有 data-src 的图片（懒加载图片）
    document.querySelectorAll('img[data-src]').forEach((img) => {
      // 让观察器开始监听每个图片
      // console.log(img)
      observer.observe(img)
    })
  })

  return (
    <div className="demo__IntersectionObserver">
      <div>{state ? '加载图片' : '未加载图片'}</div>
      <div
        style={{
          maxHeight: 300,
          width: 400,
          overflowY: 'auto',
          padding: 10,
          border: '1px solid #fff',
          borderRadius: 8,
        }}
      >
        <div style={{ height: '120vh', width: 10, background: 'green' }} />
        <img data-src="/image/t.jpg" />
        <div style={{ height: '120vh', width: 10, background: 'green' }} />
      </div>
    </div>
  )
}
