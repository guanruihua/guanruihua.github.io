import React from 'react'

export const load = () => {
  React.useEffect(() => {
    // 动态加载 PDF.js
    const script = document.createElement('script')
    script.src =
      // 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.min.js'
      '/js/pdf.2.12.313.min.js'
    script.onload = () => {
      // 设置 worker 路径
      ;(window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
        '/js/pdf.2.12.313.worker.min.js'
      // 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js'

      // 在这里可以初始化 PDF 相关功能
      console.log('PDF.js 已加载')
    }
    document.body.appendChild(script)

    return () => {
      // 组件卸载时移除 script
      document.body.removeChild(script)
    }
  }, [])

  // const url = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
  const url = '/js/html2canvas.1.4.1.min.js'

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
