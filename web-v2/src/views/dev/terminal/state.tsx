import React from 'react'
import { getStatusCode } from './helper'

export const usePageState = () => {
  const items = [
    //
    { url: 'http://localhost:4000/', title: '' },
    { url: 'http://localhost:8080/', title: '' },
    // { url: 'https://www.baidu.com', title: '' },
    // { url: 'https://skillsmp.com/zh', title: 'skillsmp / manus' },
  ]

  const init = async () => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const { url } = item
      const code = await getStatusCode(url)
      const status = String(code)[0] + 'xx'
      // console.log('🚀 ~ init ~ status:', status)
      const doms = document.querySelectorAll(
        `.dev__terminal .url-items .item[data-url="${url}"]`,
      )
      doms.forEach((dom: HTMLDivElement) => {
        dom.dataset.status = status
        if (!code) return
        const codeDom: HTMLSpanElement = dom.querySelector('.code')
        if (codeDom) {
          codeDom.innerText = String(code)
        }
      })
    }
  }

  React.useEffect(() => {
    init()
  }, [])
  return { items }
}
