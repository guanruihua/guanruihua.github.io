import React from 'react'
import { d1 } from './data'
const min = (list: number[]): number | undefined => {
  let value = list[0]
  list.forEach((val, i) => {
    if (i === 0) return
    if (val > value) return
    value = val
  })
  return value
}
const max = (list: number[]): number | undefined => {
  let value = list[0]
  list.forEach((val, i) => {
    if (i === 0) return
    if (val < value) return
    value = val
  })
  return value
}


export function SvgDemo() {
  const w = 400
  const h = 200
  const gap = 24

  const values = d1.slice(0, 10).map((item, i) => item.value)
  const minVal = min(values) || 0
  const maxVal = max(values) || 0
  // const gap = maxVal - minVal
  const unit = 100 / gap
  // const unit = 1
  const data = values
    .map((value, i) => [i * 30, (value - minVal) * unit].join(','))
    .join(', ')
  console.log({ data, minVal, maxVal, gap, unit })
  return (
    <div className="au-flex">
      <svg width={w} height={h} shapeRendering={'geometricPrecision'}>
        {/* <path d="M50,50 C75,25 125,75 150,50" stroke="#fff" fill="none" /> */}
        {[
          `0,${gap} Q0,0 ${gap},0`,
          `${w - gap},0 Q${w},0 ${w},${gap}`,
          `${w},${h - gap} Q${w},${h} ${w - gap},${h}`,
          `0,${h - gap} Q0,${h} ${gap},${h}`,
          // --
          `${gap},0 ${w - gap},0`,
          `${w},${gap} ${w},${h - gap}`,
          `${gap},${h} ${w - gap},${h}`,
          `0,${gap} 0,${h - gap}`,
        ].map((d, i) => {
          return (
            <path
              key={i}
              d={'M' + d}
              stroke="#fff"
              fill="none"
              strokeWidth={i < 5 ? 1.8 : 3}
            />
          )
        })}
      </svg>
      <div
        style={{
          width: w,
          height: h,
          border: '1px solid #fff',
          borderRadius: 24,
        }}
      ></div>
      <svg width="200" height="200" shapeRendering={'geometricPrecision'}>
        <path
          d="M50,150 Q100,50 150,150"
          stroke="#fff"
          fill="none"
          strokeWidth={2}
        />
        <path
          d="M50,150 Q100,105 150,150"
          stroke="#fff"
          fill="none"
          strokeWidth={2}
        />
        <path d="M50,150 150,150" stroke="#fff" fill="none" strokeWidth={2} />
      </svg>
      <svg width="300" height="100" viewBox="0 0 300 100">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          {/* <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient> */}
        </defs>
        <polyline
          // points="20,50 80,10 140,90 200,30 260,70"
          points={data}
          fill="none"
          // stroke="#3b82f6"
          stroke="url(#lineGradient)"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}
