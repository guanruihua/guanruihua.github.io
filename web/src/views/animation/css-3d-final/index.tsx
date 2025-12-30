import React from 'react'
import './index.less'
import { usePageState } from './state'

// https://codepen.io/sunkanmii-the-styleful/pen/vELMoMZ
export default function () {
  const { state, setState } = usePageState()

  return (
    <div className="animation__css-3d-final">
      <div className="scene">
        <div className="image-container">
          <div className="original">
            <img
              // src="/image/gradation.jpg"
              src={state.img}
              alt="3D Image"
            />
          </div>
          <div className="layers" aria-hidden="true">
            {new Array(35).fill('').map((_, i) => (
              <div
                key={i}
                className="layer"
                style={{ '--i': String(i + 1) } as React.CSSProperties}
              >
                <img
                  src={state.img}
                  // src="/image/gradation.jpg"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="controls">
        <h3>3D Controls</h3>
        <label>
          Perspective: <span>{state?.perspective || 0}px</span>
        </label>
        <input
          type="range"
          min="200"
          max="2000"
          value={state?.perspective || 0}
          onChange={(e) =>
            setState({ perspective: Number(e.target.value) || 0 })
          }
        />

        <label>
          Layer Offset: <span>{state?.offsetValue || 0}px</span>
        </label>
        <input
          type="range"
          id="offset"
          min="0.5"
          max="5"
          step="0.1"
          value={state?.offsetValue || 0}
          onChange={(e) =>
            setState({ offsetValue: Number(e.target.value) || 0 })
          }
        />

        <label>
          Rotate X: <span>{state.rotateX ?? 0}</span>
        </label>
        <input
          type="range"
          min="-90"
          max="90"
          value={state.rotateX}
          onChange={(e) => setState({ rotateX: Number(e.target.value) })}
        />

        <label>
          Rotate Y: <span>{state.rotateY ?? 0}</span>
        </label>
        <input
          type="range"
          min="-90"
          max="90"
          value={state.rotateY}
          onChange={(e) => setState({ rotateY: Number(e.target.value) })}
        />

        <div className="image-selector">
          <label>Try Different Images:</label>
          <button onClick={() => setState({ img: '/image/scenery.jpg' })}>
            Abstract Gradient
          </button>
          <button onClick={() => setState({ img: '/image/gradation.jpg' })}>
            Foggy Forest
          </button>
          <button onClick={() => setState({ img: '/image/t3.jpg' })}>
            妮露
          </button>
        </div>
      </div>
    </div>
  )
}
