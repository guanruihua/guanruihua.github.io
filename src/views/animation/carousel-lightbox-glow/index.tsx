import React from 'react'
import './index.less'
import { usePageState } from './state'

export default function () {
  usePageState()
  return (
    <div className="animation__carousel-lightbox-glow">
      <div className="carousel-wrapper">
        <div className="carousel" id="carousel"></div>
      </div>

      <div className="lightbox-overlay" id="lightbox">
        <span className="close-btn" id="closeBtn">
          &times;
        </span>
        <img
          className="lightbox-img"
          id="lightboxImg"
          src=""
          alt="Vergrote afbeelding"
        />
      </div>
    </div>
  )
}
