import React from 'react'

/**
 * 
 * @param url 
 * @param cb 
 * @eg
    useLoadJS('/js/xxx.min.js')
 */
export const useLoadJS = (url: string, cb?: () => void, cb2?: () => void) => {
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
      cb2?.()
      document.body.removeChild(script)
    }
  }, [])
}
