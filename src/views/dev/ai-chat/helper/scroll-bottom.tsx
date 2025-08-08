import React from 'react'

export const useScrollBottom = (): [
  React.RefObject<HTMLDivElement>,
  () => void,
] => {
  const ref = React.useRef<HTMLDivElement>(null)
  const timer = React.useRef<any>(null)
  const scrollBottom = (timeout = 500) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      const dom = ref.current
      if (dom) {
        dom.scrollTo(0, dom.scrollHeight)
      }
      if (timer) {
        clearTimeout(timer.current)
      }
    }, timeout)
  }

  return [ref, scrollBottom]
}
