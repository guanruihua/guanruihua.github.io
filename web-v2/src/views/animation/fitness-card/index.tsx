import React from 'react'
import './index.less'
import { usePageState } from './state'

// https://codepen.io/turbokit/pen/myebdWg
export default function () {
  
  usePageState()

  return (
    <div className="animation__fitness-card">
      <div className="card">
        <img src="/image/t.avif" alt="" className="bg" />
        <div className="blob"></div>

        {/* <!-- Header --> */}
        <div className="head">
          <div className="item">
            <div className="label-wrap">
              <span
                className="iconify label-icon"
                data-icon="line-md:sunny-loop"
              ></span>
              <div className="label">Weather</div>
            </div>
            <div className="value">Clear</div>
          </div>

          <div className="item">
            <div className="label-wrap">
              <span
                className="iconify label-icon"
                data-icon="mdi:temperature"
              ></span>
              <div className="label">Temp</div>
            </div>
            <div className="value">
              <div className="temp">28</div>&nbsp;°C
            </div>
          </div>

          <div className="item">
            <div className="label-wrap">
              <span
                className="iconify label-icon"
                data-icon="material-symbols-light:humidity-mid"
              ></span>
              <div className="label">Humidity</div>
            </div>
            <div className="value">
              <div className="hum">72</div>&nbsp;%
            </div>
          </div>
        </div>

        {/* <!-- Main --> */}
        <div className="content">
          <div className="main">
            {/* <!-- Running screen --> */}
            <section className="running">
              <div className="chart">
                <div id="container"></div>
              </div>
              <div className="distance">10</div>
              <div className="label running-label">Remaining Distance</div>
              <div className="heart-zone">
                <span
                  className="iconify heart-icon"
                  data-icon="line-md:heart-filled"
                ></span>
                <div className="bpm">132 bpm</div>
              </div>

              <iframe
                height="200"
                src="https://lottie.host/embed/ee60b7d1-ca79-4317-855a-64f54a9cabe0/0aBDHd9R3m.lottie"
              ></iframe>
            </section>

            {/* <!-- Target --> */}
            <div className="objective">
              <span
                className="objective-icon"
                data-icon="maki:racetrack"
              ></span>
              <div className="objective-text">Target</div>
            </div>

            <div className="number">
              <div className="aura"></div>
              <div className="distance to-run">10</div>
              <div className="unit">KM</div>
            </div>
          </div>

          {/* <!-- Stepper --> */}
          <div className="stepper">
            {/* <!-- 22 steps --> */}
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
          </div>
        </div>

        {/* <!-- Button --> */}
        <button className="button">
          <div className="button-bg"></div>
          <div className="button-text">
            <span
              className="button-icon iconify"
              data-icon="fluent:run-20-filled"
            ></span>
            Start Run
          </div>

          <div className="pause-text">
            <span
              className="button-icon iconify"
              data-icon="famicons:stop-circle-outline"
            ></span>
            End Run
          </div>
        </button>
      </div>

      <button className="reload" onClick={() => window.history.go(0)}>
        <span className="iconify arrows" data-icon="ci:arrows-reload-01"></span>
        reload
      </button>
    </div>
  )
}
