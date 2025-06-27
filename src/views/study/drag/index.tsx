import React from 'react'
import './index.less'
import { Ele } from './ele'

export default function () {
  return (
    <div className="study-drag">
      <Ele />
      <Ele />
      <Ele />
      {/* <div className="mesh">
        {new Array(24 * 12).fill('').map((item, i) => {
          return <div key={i}></div>
        })}
      </div> */}
    </div>
  )
}
