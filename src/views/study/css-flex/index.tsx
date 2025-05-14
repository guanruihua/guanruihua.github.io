import React from 'react'
import './index.less'

export function CSS_Flex() {
  return (
    <div className="study-page-css-flex md">
      <div className="card render">
        <h3>flex：1</h3>
        <p>flex：1 是 flex-grow: 1, flex-shrink: 1,flex-basis: 0% 的缩写；</p>
        <h4>flex-grow</h4>
        <p>内容的宽度是500px，flex item的flex-basic是60px。</p>
        <p>A,B 为 flex-grow:1 / C和D为 flex-grow:4</p>
        <div className="content">
          <div className="box" style={{ background: 'red' }}>
            A(86)
          </div>
          <div className="box" style={{ background: 'lightblue' }}>
            B(86)
          </div>
          <div className="box1" style={{ background: 'yellow' }}>
            C(164)
          </div>
          <div className="box1" style={{ background: 'brown' }}>
            D(164)
          </div>
        </div>
        <p>A = B = 60 + ((500 - 60 * 4)/ (1+1+4+4)) * 1 = 86</p>
        <p>C = D = 60 + ((500 - 60 * 4)/ (1+1+4+4)) * 4 = 164</p>
        <hr style={{ margin: '14px 0' }} />
        <h4>flex-shrink</h4>
        <div className="content2">
          <div className="box" style={{ background: 'red', flexBasis: 100 }}>
            A(83.88)
          </div>
          <div
            className="box"
            style={{ background: 'lightblue', flexBasis: 200 }}
          >
            B(167.73)
          </div>
          <div
            className="box1"
            style={{ background: 'yellow', flexBasis: 300 }}
          >
            C(106.45)
          </div>
          <div className="box1" style={{ background: 'brown', flexBasis: 400 }}>
            D(141.94)
          </div>
        </div>
        <p>
          A = 100 - 100 * 1 / (100 * 1 + 200 * 1 + 300 * 4 + 400 * 4) * NT =
          83.87096774193549
        </p>
        <p>
          B = 200 - 200 * 1 / (100 * 1 + 200 * 1 + 300 * 4 + 400 * 4) * NT =
          167.74193548387098
        </p>
        <p>
          C = 300 - 300 * 4 / (100 * 1 + 200 * 1 + 300 * 4 + 400 * 4) * NT =
          106.45161290322582
        </p>
        <p>
          D = 400 - 400 * 4 / (100 * 1 + 200 * 1 + 300 * 4 + 400 * 4) * NT =
          141.93548387096774
        </p>
      </div>
    </div>
  )
}
