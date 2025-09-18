import React from 'react'
import { usePageState } from './state'
import './index.less'

export default function () {
  const { ref, state, setState } = usePageState()

  return (
    <div className="game__2048">
      <div ref={ref}></div>
    </div>
  )
}
