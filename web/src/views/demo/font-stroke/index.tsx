import React from 'react'
import './index.less'

export default function () {
  React.useEffect(() => {
    const canvas: any = document.getElementById('canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 250
    ctx.lineWidth = 2
    ctx.font = '50px Arial'
    ctx.strokeText('Hello World', 0, 100)

    ctx.lineWidth = 5
    ctx.font = '50px Arial'
    ctx.strokeText('Hello World', 0, 200)
  }, [])

  return (
    <div className="study-page-example-font-stroke md">
      <h1>字体描边</h1>
      <h2>text-stroke</h2>
      <p>优点: 效果好</p>
      <p>缺点: </p>
      <ul>
        <li>兼容性一般</li>
        <li>有描边吞字可能性</li>
      </ul>
      <div className="render">
        <div style={{ WebkitTextStroke: 'unset' }}>text-stroke: unset</div>
        <div style={{ WebkitTextStroke: '0px red' }}>text-stroke: 0px red</div>
        <div style={{ WebkitTextStroke: '2px red' }}>text-stroke: 2px red</div>
      </div>
      <hr />
      <h2>text-shadow</h2>
      <p>优点: 兼容性好</p>
      <p>缺点: 效果一般, 有锯齿感</p>
      <div className="render">
        <div
          style={{
            letterSpacing: 4,
            textShadow: '#000 5px 0 0, red 0 5px 0, red -5px 0 0, red 0 -5px 0',
            color: '#000',
          }}
        >
          text-shadow
        </div>
      </div>
      <hr />
      <h2>SVG</h2>
      <p>优点: 效果好, 兼容性好</p>
      <p>缺点: IOS 出现吞字</p>
      <div className="render">
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
          <text
            x="0"
            y="0"
            alignmentBaseline="text-before-edge"
            textAnchor="start"
            fill="#FFE4C1"
            strokeLinejoin="round"
          >
            字体描边
          </text>
          <text
            x="0"
            y="60"
            alignmentBaseline="text-before-edge"
            textAnchor="start"
            strokeLinejoin="miter"
            fill="#FFE4C1"
          >
            字体描边
          </text>
          <text
            x="0"
            y="120"
            alignmentBaseline="text-before-edge"
            textAnchor="start"
            strokeLinejoin="bevel"
            fill="#FFE4C1"
          >
            字体描边
          </text>
        </svg>
      </div>
      <h2>Canvas</h2>
      <p>优点: 兼容性好</p>
      <p>缺点: </p>
      <ol>
        <li>字体较模糊</li>
        <li>描边吞字</li>
        <li>需要canvas api 来绘制</li>
      </ol>
      <div className="render">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  )
}
