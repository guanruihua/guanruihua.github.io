import React from 'react'
import { throttle } from './help'

export interface EleProps {
  [key: string]: any
}

export function Dnd(props: EleProps) {
  const { onDragEnd, children } = props
  const ref = React.useRef<HTMLDivElement>(null)
  const rect = React.useRef({
    drag: false,
    offsetX: 0,
    offsetY: 0,
    lastX: -1,
    lastY: -1,
  })

  const handleMouseMove = throttle((e: any) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    if (!ref.current || !rect.current.drag) return
    const bodyRect = window.document.body.getBoundingClientRect()
    const eleRect = ref.current.getBoundingClientRect()

    const range = (val: number, type: 'x' | 'y' = 'x') => {
      if (val < 0) return 0
      if (type === 'x') {
        const maxX = bodyRect.width - eleRect.width
        if (val >= maxX) return maxX
      }
      if (type === 'y') {
        const maxY = bodyRect.height - eleRect.height
        if (val >= maxY) return maxY
      }
      return val
    }

    let left = range(e.clientX - rect.current.offsetX, 'x')
    let top = range(e.clientY - rect.current.offsetY, 'y')
    ref.current.style.left = left + 'px'
    ref.current.style.top = top + 'px'
  }, 10)

  function handleMouseUp() {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    if (!ref.current) return
    rect.current.offsetX = 0
    rect.current.offsetY = 0
    rect.current.drag = false

    ref.current.style.opacity = 'none'

    onDragEnd?.(ref, rect.current)
  }

  function onMouseDown(e: any) {
    e.preventDefault()
    e.stopPropagation()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    if (!ref.current) return
    const eleRect = ref.current.getBoundingClientRect()

    rect.current.lastX = Number(ref.current.style.left.replace('px', '')) || 0
    rect.current.lastY = Number(ref.current.style.top.replace('px', '')) || 0
    rect.current.offsetX = e.clientX - eleRect.left
    rect.current.offsetY = e.clientY - eleRect.top
    rect.current.drag = true
    ref.current.style.opacity = '.8'
    

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  return (
    <div ref={ref} className="ele" onMouseDown={onMouseDown}>
      {children}
    </div>
  )
}
