import React from 'react'

export const useLoadJS = (url: string, cb?: () => void) => {
  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = url
    script.onload = () => {
      // console.log(url, '已加载')
      cb?.()
    }
    document.body.appendChild(script)

    return () => {
      // 组件卸载时移除 script
      document.body.removeChild(script)
    }
  }, [])
}
