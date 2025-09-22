import React from 'react'
import './index.less'
import { usePageState } from './state'

export default function () {
  usePageState()
  return (
    <div className="animation__change-color">
      <div className="menu">
        
        <div className="menu-item selected">
          <a href="#">Home</a>
        </div>
        <div className="menu-item">
          <a href="#">About</a>
        </div>
        <div className="menu-item">
          <a href="#">Contact</a>
        </div>
      </div>

      <div className="hero">
        <div style={{ margin: '2rem' }}>
          <label>
            <div id="selectedColor"></div>
            <input type="color" id="baseColor" value="#1995ad" />
          </label>
        </div>

        <img
          id="coffee"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Cup-dynamic-clay.png/250px-Cup-dynamic-clay.png"
          alt="Hero Image"
        />

        <div className="color-info">
          <p id="menuColor"></p>
        </div>
      </div>

      <div className="row large-boxes">
        <div className="box" id="box1"></div>
        <div className="box" id="box2"></div>
        <div className="box" id="box3"></div>
      </div>
    </div>
  )
}
