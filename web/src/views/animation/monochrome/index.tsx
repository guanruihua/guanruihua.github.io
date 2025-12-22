import React from 'react'
import './index.less'
import { useSetState } from '0hook'

export default function () {
  const [state, setState] = useSetState({
    hue: 134,
  })
  return (
    <div
      className="animation__monochrome"
      style={
        {
          '--hue': state.hue || 134,
        } as React.CSSProperties
      }
    >
      <div className="hue-input">
        <input
          id="hueRange"
          type="range"
          min={1}
          max={360}
          defaultValue={337}
          step={1}
          className="slider"
          list="rangemarkers"
          onInput={(e: any) => {
            const val = e.target.value
            setState({
              hue: Number(val),
            })
          }}
        />
        {/* <datalist id="rangemarkers">
          <option value={60} label={60} />
          <option value={120} label={120} />
          <option value={180} label={180} />
          <option value={240} label={240} />
          <option value={300} label={300} />
        </datalist> */}
        <h2>
          HUE: <output className="hue-value" id="hueValue" />
        </h2>
      </div>
      <div className="range-output">
        <div className="output-row" id="labels">
          <p>LUMINANCE</p>
          <p>20%</p>
          <p>40%</p>
          <p>60%</p>
          <p>80%</p>
        </div>
        <div className="output-row" id="sat25">
          <p>25% SATURATION</p>
          <div className="output-tile-grp">
            <div className="output-tile" />
            <div className="output-tile" />
            <div className="output-tile" />
            <div className="output-tile" />
          </div>
        </div>
        <div className="output-row" id="sat50">
          <p>50% SATURATION</p>
          <div className="output-tile-grp">
            <div className="output-tile" />
            <div className="output-tile" />
            <div className="output-tile" />
            <div className="output-tile" />
          </div>
        </div>
        <div className="output-row" id="sat75">
          <p>75% SATURATION</p>
          <div className="output-tile-grp">
            <div className="output-tile" id="tile5" />
            <div className="output-tile" id="tile6" />
            <div className="output-tile" id="tile7" />
            <div className="output-tile" id="tile8" />
          </div>
        </div>
      </div>
    </div>
  )
}
