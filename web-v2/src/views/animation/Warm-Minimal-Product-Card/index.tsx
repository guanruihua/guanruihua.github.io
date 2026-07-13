import React from 'react'
import './index.scss'

export default function WarmMinimalProductCard() {
  return (
    <div className='warm-minimal-product-card'>
      <div className="product-card">
        <div className="card-content">
          <div className="image-container">
            <input
              type="checkbox"
              id="theme-toggle"
              className="theme-switch__input"
            />
            <div className="image"></div>
            <label htmlFor="theme-toggle" className="theme-switch">
              <div className="theme-switch__container">
                <div className="theme-switch__circle"></div>
                <div className="theme-switch__icons">
                  <svg
                    className="icon icon--sun"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                  <svg
                    className="icon icon--moon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M21 12.79A9 9 0 1 1 11.21 3 
                       7 7 0 0 0 21 12.79z"
                    ></path>
                  </svg>
                </div>
              </div>
            </label>
          </div>
          <div className="info-container">
            <header>
              <span className="brand">HOLIME</span>
              <h1 className="title">
                Modern Minimalist
                <br />
                Bedroom Set
              </h1>
              <p className="price">
                $3,500 <span>USD</span>
              </p>
              <p className="description">
                Create a peaceful sanctuary with this modern minimalist bedroom
                set, timeless design crafted htmlForcomfort and style.
              </p>
            </header>
            <button className="btn-primary">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  )
}
