import React from 'react'
import './index.less'

const colors = [
  '#5070dd',
  '#b6d634',
  '#505372',
  '#ff994d',
  '#0ca8df',
  '#ffd10a',
  '#fb628b',
  '#785db0',
  '#3fbe95',
]

export default function Page_mermaid_pie() {
  const getXY = (angle = 0, r = 150) =>
    `${r * Math.sin((angle * Math.PI) / 180)},${-r * Math.cos((angle * Math.PI) / 180)}`

  const items: [number, string][] = [
    [45, 'pard A'],
    [90, 'pard B'],
    [170, 'pard C'],
    [55, 'pard D'],
  ]

  return (
    <div className="animation__mermaid-pie flex flex-wrap flex-col justify-center bg-white/10 relative w-200">
      <svg
        width="800"
        height="600"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(200, 200)">
          {items.map(([rate], i) => {
            const startAngle = items
              .slice(0, i)
              .reduce((total, item) => total + item[0], 0)

            const endAngle = startAngle + rate

            const [x, y] = getXY(startAngle + rate / 2, (150 * 5) / 7).split(
              ',',
            )
            return (
              <React.Fragment>
                <path
                  key={i}
                  className="slice"
                  d={`M0,0 L${getXY(startAngle)} A150,150 0 0,1 ${getXY(endAngle)} Z`}
                  fill={colors[i % colors.length]}
                />
                <text className="label" x={x} y={y} text-anchor="middle">
                  {rate}%
                </text>
              </React.Fragment>
            )
          })}
        </g>
      </svg>
      <div className="legend absolute right-2">
        {items.map((item, i) => {
          const label = item[1]
          return (
            <div
              key={i}
              className="text-white flex flex-nowrap items-center gap-1.25"
            >
              <div
                className="w-2.5 h-2.5 rounded-xs"
                style={{ background: colors[i % colors.length] }}
              />
              <span> {label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
