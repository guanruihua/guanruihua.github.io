import React from 'react'
import { throttle } from './help'
import { Div } from 'aurad'
import { classNames } from 'harpe'

export interface EleProps {
  [key: string]: any
}

export function Dnd(props: EleProps) {
  const { id, none, onDragStart, onDragging, onDragEnd, children, ...rest } =
    props
  const ref = React.useRef<HTMLDivElement>(null)
  const cache = React.useRef({
    id,
    drag: false,
    leaveLeft: false,
    dragCount: 0,
    offsetX: 0,
    offsetY: 0,
    lastX: -1,
    lastY: -1,
  })

  const handleMouseMove = throttle((e: any) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    if (!ref.current || !cache.current.drag) return
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

    const left = range(e.clientX - cache.current.offsetX, 'x')
    const top = range(e.clientY - cache.current.offsetY, 'y')
    ref.current.style.left = left + 'px'
    ref.current.style.top = top + 'px'
    onDragging?.(ref, cache.current, props)
  }, 10)

  function handleMouseUp() {
    if (!ref.current) return
    cache.current.offsetX = 0
    cache.current.offsetY = 0
    cache.current.drag = false
    cache.current.dragCount = cache.current.dragCount + 1

    ref.current.style.opacity = 'none'
    ref.current.style.zIndex = '1'
    ref.current.style.opacity = '1'
    ref.current.style.border = 'none'

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    onDragEnd?.(ref, cache.current, props)
  }

  function onMouseDown(e: any) {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    if (!ref.current) return
    const eleRect = ref.current.getBoundingClientRect()

    cache.current.lastX = Number(ref.current.style.left.replace('px', '')) || 0
    cache.current.lastY = Number(ref.current.style.top.replace('px', '')) || 0
    cache.current.offsetX = e.clientX - eleRect.left
    cache.current.offsetY = e.clientY - eleRect.top
    cache.current.drag = true
    ref.current.style.opacity = '.8'
    ref.current.style.zIndex = '10000'
    ref.current.style.border = '1px solid rgba(255,255,255, 9)'

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    onDragStart?.(ref, cache.current, props)
  }
  return (
    <div
      className={classNames('ele',{ none })}
      ref={ref}
      onMouseDown={onMouseDown}
      {...rest}
    >
      {children}
    </div>
  )
}
