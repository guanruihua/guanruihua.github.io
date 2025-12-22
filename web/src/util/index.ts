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

export const scrollIntoView = (querySelectorName: string) => {
  const dom = document.querySelector(querySelectorName)
  dom?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export const downloadJSON = (jsonString: string, filename: string) => {
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename || 'data.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
