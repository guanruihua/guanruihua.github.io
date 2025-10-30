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
    script.onerror = () => {
      console.log(url, '加载失败')
    }
    document.body.appendChild(script)

    return () => {
      // 组件卸载时移除 script
      cb2?.()
      document.body.removeChild(script)
    }
  }, [])
}

export const useLoadMultipleJS = (
  urls: string[],
  cb?: () => void,
  cb2?: () => void,
) => {
  React.useEffect(() => {
    const res = Promise.all(
      urls.map((url) => {
        return new Promise((rs, rj) => {
          const script = document.createElement('script')
          script.src = url
          script.onload = () => {
            // console.log(url, '已加载')
            rs(script)
          }
          script.onerror = () => {
            console.log(url, '加载失败')
            rj(undefined)
          }
          document.body.appendChild(script)
        })
      }),
    ).then((res) => {
      cb?.()
      // res.forEach((script: any) => {
      //   console.log('🚀 ~ useLoadMultipleJS ~ script:', script)
      // })
    })

    return () => {
      // 组件卸载时移除 script
      cb2?.()
      res?.then((script: any) => {
        script && document.body.removeChild(script)
      })
    }
  }, [])
}
export const useLoadMultipleCSS = (
  urls: string[],
  cb?: () => void,
  cb2?: () => void,
) => {
  React.useEffect(() => {
    const res = Promise.all(
      urls.map((url) => {
        return new Promise((rs, rj) => {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = url
          link.onload = () => {
            // console.log(url, '已加载')
            rs(link)
          }
          link.onerror = () => {
            console.log(url, '加载失败')
            rj(undefined)
          }
          document.head.appendChild(link)
        })
      }),
    ).then((res) => {
      cb?.()
      // res.forEach((script: any) => {
      //   console.log('🚀 ~ useLoadMultipleJS ~ script:', script)
      // })
    })

    return () => {
      // 组件卸载时移除 script
      cb2?.()
      res?.then((dom: any) => {
        dom && document.head.removeChild(dom)
      })
    }
  }, [])
}
