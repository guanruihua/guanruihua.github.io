import React from 'react'

export const load = () => {
  const url = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js'

  React.useEffect(() => {
    // 动态加载 PDF.js
    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      // 设置 worker 路径
      console.log(url, '已加载')
    }
    document.body.appendChild(script)

    return () => {
      // 组件卸载时移除 script
      document.body.removeChild(script)
    }
  }, [])
}
