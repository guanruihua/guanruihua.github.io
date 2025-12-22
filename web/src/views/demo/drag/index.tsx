import React, { RefObject } from 'react'
import './index.less'
import { Dnd } from './dnd'
import { zeroLastDigit, leftSideWidth } from './help'
import { ObjectType } from '0type'
import { usePageState } from './hook'

export default function () {
  const h = usePageState()
  const { state, setState } = h

  const onDragStart = (ref: RefObject<HTMLDivElement>, cache: ObjectType) => {
    setState({
      selectId: cache.id,
    })
  }

  const onDragging = (ref: RefObject<HTMLDivElement>, cache: ObjectType) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x: any = document.querySelector('.auxiliary-line.auxiliary-line-x')
    const y: any = document.querySelector('.auxiliary-line.auxiliary-line-y')

    if (x) x.style.top = zeroLastDigit(rect.top) + 'px'
    if (y)
      y.style.left =
        (rect.left > leftSideWidth ? zeroLastDigit(rect.left) : leftSideWidth) +
        'px'
  }

  const onDragEnd = (ref: RefObject<HTMLDivElement>, cache: ObjectType) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const { id } = cache

    if (!state.list) state.list = []

    if (rect.left < leftSideWidth) {
      ref.current.style.left = '10px'
      ref.current.style.top = '10px'
      if (h.inContent(id)) h.del(id)
    } else {
      ref.current.style.left = zeroLastDigit(rect.left) + 'px'
      ref.current.style.top = zeroLastDigit(rect.top) + 'px'
      if (h.inSider(id)) {
        h.create()
        h.to(id, 'content')
      }
    }
    setState(state)
  }

  return (
    <div className="study-drag">
      <div className="sider">
        {state.list?.map(({ id, type }) => (
          <Dnd
            key={id}
            id={id}
            onDragStart={onDragStart}
            onDragging={onDragging}
            onDragEnd={onDragEnd}
            none={type === 'del'}
          >
            {id}
            {/* <input type='text'/> */}
          </Dnd>
        ))}
      </div>
      <div className="content"></div>
      <div className="auxiliary-line auxiliary-line-x"></div>
      <div className="auxiliary-line auxiliary-line-y"></div>
    </div>
  )
}
