import React from 'react'
import './index.less'
import { load } from './helper'

export default function Demo_Babylon() {

  React.useEffect(() => {
    load()
  }, [])

  return (
    <div className="demo_babylon">
      <canvas className="renderCanvas"></canvas>
    </div>
  )
}
