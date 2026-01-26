import React from 'react'

export default function Mermaid_quadrantChart() {
  const u = 300
  const u2 = u * 2

  const Conf = {
    xAxis: ['Low Reach', 'High Reach'],
    yAxis: ['Low Engagement', 'High Engagement'],
    quadrants: [
      'We should expand',
      'Need to promote',
      'Re-evaluate',
      'May be improved',
    ],
    items: [
      ['A0', 0, 0],
      ['Campaign A', 0.3, 0.6],
      ['Campaign B', 0.45, 0.23],
      ['Campaign C', 0.57, 0.69],
      ['Campaign D', 0.78, 0.34],
      ['Campaign E', 0.4, 0.34],
      ['Campaign F', 0.35, 0.78],
      ['Z', 1, 1],
    ],
  }

  return (
    <div className="h-(--height) w-full min-h-200 bg-white/10 rounded-xl">
      <svg className="h-(--height) w-full min-h-200">
        <g transform="translate(80, 80)">
          <path
            d={`M 0,0 ${u2},0 ${u2},${u2} ${0},${u2} Z`}
            fill="#242525"
            stroke="#fff"
            strokeWidth={1.5}
          />

          <path
            d={`M ${u},0 ${u},${u2} M 0,${u} ${u2},${u}`}
            fill="none"
            stroke="#fff"
            strokeWidth={1}
          />

          {/* 1 */}
          <rect
            x={1}
            y={1}
            width={u - 2}
            height={u - 2}
            fill="rgba(255,255,255, .05)"
            stroke="none"
          />
          {/* 2 */}
          <rect
            x={u + 1}
            y={1}
            width={u - 2}
            height={u - 2}
            fill="rgba(255,255,255, .09)"
            stroke="none"
          />
          {/* 3 */}
          <rect
            x={u + 1}
            y={u + 1}
            width={u - 2}
            height={u - 2}
            fill="rgba(255,255,255, .05)"
            stroke="none"
          />
          {/* 4 */}
          <rect
            x={1}
            y={u + 1}
            width={u - 2}
            height={u - 2}
            fill="rgba(255,255,255, .01)"
            stroke="none"
          />
          {Conf.quadrants.map((label, i) => {
            const [x, y] = [
              [15, 25],
              [15 + u, 25],
              [15 + u, 25 + u],
              [15, 25 + u],
            ][i]
            return (
              <text
                key={i}
                x={x}
                y={y}
                fill="rgba(255,255,255,.5)"
                fontSize={10}
                fontWeight={900}
                style={{
                  letterSpacing: 2,
                }}
              >
                {label}
              </text>
            )
          })}

          {Conf.xAxis.map((label, i) => {
            const [x, y] = [
              [15, 25 + u2],
              [15 + u, 25 + u2],
            ][i]
            return (
              <text
                key={i}
                x={x + u / 2 - 15}
                y={y}
                stroke="none"
                fill="rgba(255,255,255,.5)"
                fontSize={10}
                fontWeight={900}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  letterSpacing: 2,
                }}
              >
                {label}
              </text>
            )
          })}
          {Conf.yAxis.map((label, i) => {
            const y = [
              //
              -u - u / 2,
              -u / 2,
            ][i]

            return (
              <text
                key={i}
                x={y}
                y={-15}
                fill="rgba(255,255,255,.5)"
                fontSize={10}
                fontWeight={900}
                textAnchor="middle"
                dominantBaseline="middle"
                transform="rotate(-90)"
                style={{
                  letterSpacing: 2,
                }}
              >
                {label}
              </text>
            )
          })}
          {Conf.items.map((item, i) => {
            const [label, xv, yv]: any[] = item
            const x = u2 * xv
            const y = u2 - u2 * yv
            return (
              <React.Fragment key={i}>
                <circle cx={x} cy={y} r={4} fill="#eee" stroke="none" />
                <text
                  x={x}
                  y={y + 12}
                  fill="rgba(255,255,255,.7)"
                  stroke="none"
                  fontSize={10}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {label}
                </text>
              </React.Fragment>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
