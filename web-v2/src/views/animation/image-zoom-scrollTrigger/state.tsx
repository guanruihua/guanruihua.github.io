import React from 'react'

export const usePageState = () => {
  const domRef = React.useRef<HTMLDivElement>(null)
  const coverRef = React.useRef<HTMLDivElement>(null)
  const bgRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const dom = domRef.current
    const cover = coverRef.current
    const bg = bgRef.current

    if (!dom || !cover || !bg) return
    const sectionHeight = dom.getBoundingClientRect().height

    dom.addEventListener('scroll', function () {
      const scrolledFromTop = this.scrollTop
      if (scrolledFromTop > sectionHeight) return
      const rate = (scrolledFromTop * 2) / sectionHeight
      cover.style.transform = `scale(${1 + rate * 3})`
      cover.style.setProperty('--overlay-opacity', String(1 - rate))
      bg.style.filter = `blur(${3 - rate * 3}px)`
    })
  }, [])

  return {
    domRef,
    coverRef,
    bgRef,
  }
}
