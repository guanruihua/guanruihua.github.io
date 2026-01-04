import React from 'react'

export const useScrollBottom = (): [
  React.RefObject<HTMLDivElement>,
  () => void,
] => {
  const ref = React.useRef<HTMLDivElement>(null)
  const scrollBottom = () => {
    const dom = ref.current
    if (dom) {
      dom.scrollTo(0, dom.scrollHeight)
    }
  }

  return [ref, scrollBottom]
}
