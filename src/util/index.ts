export * from './req'
export * from './conf'

import { message } from 'aurad'
import { copyText } from 'harpe'

export const get = async (url: string): Promise<Record<string, any>> => {
  const xhr = new XMLHttpRequest()
  return new Promise((rs) => {
    xhr.open('GET', url, true)

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        const responseData = JSON.parse(xhr.responseText)
        rs({ code: 200, data: responseData })
      } else {
        rs({ code: xhr.status, data: null })
      }
    }

    xhr.onerror = function () {
      rs({ code: -1, data: null })
    }

    xhr.send()
  })
}

export const copy = (val: any) => {
  if (copyText(val)) {
    message.success('Copy Success ')
  } else {
    message.error('Copy Fail ')
  }
}
