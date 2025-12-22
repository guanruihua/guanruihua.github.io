import React from 'react'
import './index.less'
import { usePageState } from './state'

export default function () {
  const { toggleAnimation, resetPosition, changeDirection } = usePageState()

  return (
    <div className="study__card-beam-animation">
      <div className="controls">
        <button className="control-btn" onClick={toggleAnimation}>
          ⏸️ Pause
        </button>
        <button className="control-btn" onClick={resetPosition}>
          🔄 Reset
        </button>
        <button className="control-btn" onClick={changeDirection}>
          ↔️ Direction
        </button>
      </div>

      <div className="speed-indicator">
        Speed: <span id="speedValue">120</span> px/s
      </div>

      <div className="container">
        <canvas id="particleCanvas"></canvas>
        <canvas id="scannerCanvas"></canvas>

        <div className="scanner"></div>

        <div className="card-stream" id="cardStream">
          <div className="card-line" id="cardLine"></div>
        </div>
      </div>
    </div>
  )
}
