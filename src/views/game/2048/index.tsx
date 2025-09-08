import React from 'react'
import { usePageState } from './state'
import './index.less'

export default function () {
  const { state, setState } = usePageState()

  return <div className="game-2048">2048</div>
}
