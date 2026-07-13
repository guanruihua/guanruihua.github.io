import React from 'react'
import './index.less'

// https://codepen.io/turuto/pen/ByLMvyO
export default function LoadingProgress() {
  return (
    <div className='loading-progress'>
      <div className="progress">
        <div className="progress__bar"></div>
        <div className="progress__text">Loading....</div>
      </div>
    </div>
  )
}
