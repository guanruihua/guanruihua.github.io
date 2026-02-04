import React from 'react'
import './index.less'
import { usePageState } from './state'

export default function Animation_Terminal() {
  usePageState()

  return (
    <div className="animation__terminal">
      <div className="animation__terminal-box">
        <div className="left">
          {new Array(4).fill('').map((_, i) => {
            // w 140
            // h 100

            return (
              <div key={i} className="item">
                <div className="content">AB</div>
              </div>
            )
          })}
        </div>
        <div className="center">
          <div className="ring"></div>
          <div></div>
        </div>
        <div className="right">
          {new Array(4).fill('').map((_, i) => {
            const y = i * 110
            const x = [40, 70, 70, 40][i]
            return (
              <div key={i} className="right-row" style={{ left: x, top: y }}>
                <div className="item right-item">
                  <div className="content">AB</div>
                </div>
                <div className="item right-item">
                  <div className="content">AB</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
