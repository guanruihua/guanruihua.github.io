import React from 'react'
import { usePageState } from './state'
import './index.less'

export default function () {
  const { containerRef, state, setState } = usePageState()

  return (
    <div ref={containerRef} className="game__pvz">
    </div>
  )
}
