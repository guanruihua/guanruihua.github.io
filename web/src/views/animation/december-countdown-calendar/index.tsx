import React from 'react'
import './index.less'
import { usePageState } from './state'

// https://codepen.io/tofjadesign/pen/XJdorGd
export default function () {
  usePageState()

  return (
    <div className="animation__december-countdown-calendar">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;900&family=Playfair+Display:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="bg1"></div>
      <div className="bg2"></div>
      {/* <!-- santa sleigh --> */}
      <div className="sleigh-container">
        <img src="https://iili.io/fukJl49.png" className="sleigh" id="sleigh" />
      </div>
      {/* <!-- scene container --> */}
      <div className="scene">
        <header>
          <div className="title">
            <h1>December 2025</h1>
            <span>Winter calendar • cozy days &amp; a sprinkle of snow</span>
          </div>
          <div className="controls">
            <button className="btn" id="todayBtn">
              Highlight Today
            </button>
            <button className="btn" id="resetBtn">
              Reset
            </button>
          </div>
        </header>

        {/* <!-- christmas countdown  new year countdown--> */}
        <div className="wrap">
          <div className="christmas-card" id="christmasCard" aria-live="polite">
            <div className="title">
              <div className="icon"></div>
              <div>
                <h2>Christmas Countdown</h2>
                <p className="small" id="christmasTarget">
                  —
                </p>
              </div>
            </div>

            <div
              className="count"
              id="christmasUnits"
              role="group"
              aria-label="Christmas countdown"
            >
              <div className="unit">
                <div className="num" id="c-days">
                  0
                </div>
                <div className="label">Days</div>
              </div>
              <div className="unit">
                <div className="num" id="c-hours">
                  0
                </div>
                <div className="label">Hours</div>
              </div>
              <div className="unit">
                <div className="num" id="c-mins">
                  0
                </div>
                <div className="label">Min</div>
              </div>
              <div className="unit">
                <div className="num" id="c-secs">
                  0
                </div>
                <div className="label">Sec</div>
              </div>
            </div>

            <div className="meta">
              <div id="christmasStatus">Until Christmas</div>
              <div id="christmasLocal">Local time</div>
            </div>
            <div
              className="progress"
              aria-hidden="true"
              title="progress to event"
            >
              <div className="bar" id="c-bar"></div>
            </div>
          </div>

          <div className="card" id="newyearCard" aria-live="polite">
            <div className="title">
              <div className="icon"></div>
              <div>
                <h2>New Year Countdown</h2>
                <p className="small" id="newyearTarget">
                  —
                </p>
              </div>
            </div>

            <div
              className="count"
              id="newyearUnits"
              role="group"
              aria-label="New Year countdown"
            >
              <div className="unit">
                <div className="num" id="n-days">
                  0
                </div>
                <div className="label">Days</div>
              </div>
              <div className="unit">
                <div className="num" id="n-hours">
                  0
                </div>
                <div className="label">Hours</div>
              </div>
              <div className="unit">
                <div className="num" id="n-mins">
                  0
                </div>
                <div className="label">Min</div>
              </div>
              <div className="unit">
                <div className="num" id="n-secs">
                  0
                </div>
                <div className="label">Sec</div>
              </div>
            </div>

            <div className="meta">
              <div id="newyearStatus">Until New Year</div>
              <div id="newyearLocal">Local time</div>
            </div>
            <div
              className="progress"
              aria-hidden="true"
              title="progress to event"
            >
              <div className="bar" id="n-bar"></div>
            </div>
          </div>
        </div>
        <span id="tzName"></span>
        <br />
        {/* <!-- end countdown cards --> */}

        <div className="calendar" id="calendar">
          {/* <!-- weekdays --> */}
          <div className="weekday">Mon</div>
          <div className="weekday">Tue</div>
          <div className="weekday">Wed</div>
          <div className="weekday">Thu</div>
          <div className="weekday">Fri</div>
          <div className="weekday">Sat</div>
          <div className="weekday">Sun</div>
          {/* <!-- days injected by JS --> */}
        </div>

        <div className="legend">
          <div className="item">
            <span
              className="dot"
              style={{ background: 'linear-gradient(180deg,#ffd166,#ffb84d)' }}
            ></span>{' '}
            <span style={{ color: 'var(--muted)' }}>Christmas</span>
          </div>
          <div className="item">
            <span
              className="dot"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.03)',
                width: '12px',
                height: '12px',
                borderRadius: '3px',
              }}
            ></span>{' '}
            <span style={{ color: 'var(--muted)' }}>Regular day</span>
          </div>
        </div>
      </div>

      {/* <!-- snow SVG decorations --> */}
      <svg
        className="snowflake"
        width="0"
        height="0"
        style={{ position: 'fixed', top: '0', left: '0' }}
      >
        <defs>
          <g id="flake">
            <circle cx="6" cy="6" r="1.8" fill="white" opacity="0.9" />
          </g>
        </defs>
      </svg>

      {/* <!-- modal --> */}
      <div className="modal" id="modal" aria-hidden="true">
        <div className="card" role="dialog" aria-modal="true">
          <h2 id="modalTitle">Day</h2>
          <p id="modalText">Lovely winter note.</p>
          <button className="close" id="closeModal">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
