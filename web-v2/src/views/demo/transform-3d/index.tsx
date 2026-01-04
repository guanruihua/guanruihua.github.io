import React from 'react'
import './index.less'
import { Div } from 'aurad'

export default function () {
  const [mode3d, setMode3d] = React.useState(
    // false
    true,
  )
  return (
    <Div
      className="study-transform-3d"
      classNames={{
        'transform-to-3d': mode3d,
      }}
    >
      <div className="left text">left</div>
      <div className="center transition">
        <div
          onClick={() => {
            setMode3d(!mode3d)
          }}
        >
          switch
        </div>
        <div className="content">center</div>
        <div className="bottom">bottom</div>
      </div>
      <div className="right text">right</div>
    </Div>
  )
}
