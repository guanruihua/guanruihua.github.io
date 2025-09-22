import React from 'react'
import './index.less'
import { usePageState } from './state'

export default function () {
  usePageState()
  return (
    <div className="animation__repetition-image-animation">
      <div className="main-container">
        <div
          className="image"
          style={{
            backgroundImage:
              "url('https://cdn.prod.website-files.com/65e61ac90950149fdb15e419/685027578326569ff9bb118d_2025-06-16%2017.16.41.jpg')",
          }}
        ></div>
      </div>
      <div className="controls">
        <div className="shape-controls">
          <button className="shape-btn active" data-shape="rectangle">
            1
          </button>
          <button className="shape-btn" data-shape="triangle">
            2
          </button>
          <button className="shape-btn" data-shape="chevron">
            3
          </button>
          <button className="shape-btn" data-shape="oval">
            4
          </button>
        </div>
        <div className="effect-controls">
          <button className="effect-btn active" data-effect="stroke">
            STROKE
          </button>
          <span>OR</span>
          <button className="effect-btn" data-effect="shade">
            SHADE
          </button>
        </div>
      </div>

      <div className="cursor-drag" id="cursorDrag">
        <span className="drag-text">DRAG</span>
      </div>

      <div className="debug-panel" id="debugPanel">
        <div className="debug-info">
          <span id="rotationInfo">rotation: 0.0</span>
          <span id="scaleInfo">scale: 1.0</span>
          <span id="edgesInfo">edges: 0.0</span>
        </div>
      </div>
    </div>
  )
}
