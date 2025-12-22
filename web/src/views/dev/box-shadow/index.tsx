import React from 'react'
import { conf } from './conf'
import './index.less'
import { copy } from '@/util'

export default () => {
  return (
    <div className="tool-box-shadow">
      {conf.map((val: string, i: number) => (
        <div
          key={i}
          className="item"
          style={{ boxShadow: val }}
          onClick={() => copy(val)}
        ></div>
      ))}
    </div>
  )
}
