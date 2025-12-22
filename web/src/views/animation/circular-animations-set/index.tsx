import React from 'react'
import './index.less'
import { usePageState } from './state'

export default function () {
  usePageState()
  return (
    <div className="animation__circular-animations-set">
      <h1>CIRCLE ANIMATIONS COLLECTION</h1>
      <div className="container">
        {/* <!-- 1 --> */}
        <div className="animation-container">
          <div className="animation-title">Pulsating Circles</div>
          <div id="anim1" className="circle-container"></div>
        </div>
        {/* <!-- 2 --> */}
        <div className="animation-container">
          <div className="animation-title">Rotating Orbits</div>
          <div id="anim2" className="circle-container"></div>
        </div>
        {/* <!-- 3 --> */}
        <div className="animation-container">
          <div className="animation-title">Sequential Rings</div>
          <div id="anim3" className="circle-container"></div>
        </div>
        {/* <!-- 4 --> */}
        <div className="animation-container">
          <div className="animation-title">Concentric Rotations</div>
          <div id="anim4" className="circle-container"></div>
        </div>
        {/* <!-- 5 --> */}
        <div className="animation-container">
          <div className="animation-title">Circular Waves</div>
          <div id="anim5" className="circle-container"></div>
        </div>
        {/* <!-- 6 --> */}
        <div className="animation-container">
          <div className="animation-title">Expanding Lines</div>
          <div id="anim6" className="circle-container"></div>
        </div>
        {/* <!-- 7 --> */}
        <div className="animation-container">
          <div className="animation-title">Breathing Grid</div>
          <div id="anim7" className="circle-container"></div>
        </div>
        {/* <!-- 8 --> */}
        <div className="animation-container">
          <div className="animation-title">Ripple Effect</div>
          <div id="anim8" className="circle-container"></div>
        </div>
        {/* <!-- 9 --> */}
        <div className="animation-container">
          <div className="animation-title">Fibonacci Spiral</div>
          <div id="anim9" className="circle-container"></div>
        </div>
        {/* <!-- 10 --> */}
        <div className="animation-container">
          <div className="animation-title">Halftone Gradient</div>
          <div id="anim10" className="circle-container"></div>
        </div>
        {/* <!-- 11 --> */}
        <div className="animation-container">
          <div className="animation-title">Silver Spiral</div>
          <div id="anim11" className="circle-container"></div>
        </div>
        {/* <!-- 12 --> */}
        <div className="animation-container">
          <div className="animation-title">Sunflower Spiral</div>
          <div id="anim12" className="circle-container"></div>
        </div>
      </div>
    </div>
  )
}
