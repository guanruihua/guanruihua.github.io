import React from 'react'
import { isEffectArray, isString } from 'asura-eye'

/**
 * 
 * @param url 
 * @param cb 
 * @eg
    useLoadJS('/js/xxx.min.js')
 */
export const useLoadJS = (
  urls: string | string[],
  cb?: () => void,
  cb2?: () => void,
) => {
  React.useEffect(() => {
    if (isString(urls)) {
      const oldDom = document.querySelector(`script[data-url='${urls}']`)
      if (oldDom) return
      const script = document.createElement('script')
      script.src = urls
      script.dataset.url = urls
      script.onload = () => {
        // console.log(url, '已加载')
        cb?.()
      }
      script.onerror = () => {
        console.log(urls, '加载失败')
      }
      document.body.appendChild(script)

      return () => {
        // 组件卸载时移除 script
        cb2?.()
        document.body.removeChild(script)
      }
    }

    if (isEffectArray<string>(urls)) {
      const res = Promise.all(
        urls.map((url) => {
          const oldDom = document.querySelector(`script[data-url='${url}']`)
          if (oldDom) return 0
          return new Promise((rs, rj) => {
            const script = document.createElement('script')
            script.src = url
            script.dataset.url = url
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
      ).then(() => {
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
    }
  }, [urls, cb, cb2])
}

export const useLoadCSS = (
  urls: string | string[],
  cb?: () => void,
  cb2?: () => void,
) => {
  React.useEffect(() => {
    if (isString(urls)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = urls
      link.onload = () => {
        // console.log(url, '已加载')
        cb?.()
      }
      link.onerror = () => {
        console.log(urls, '加载失败')
      }
      document.head.appendChild(link)
      return () => {
        cb2?.()
        link && document.head.removeChild(link)
      }
    }
    if (isEffectArray<string>(urls)) {
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
      ).then((/* _res */) => {
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
    }
  }, [urls, cb, cb2])
}
