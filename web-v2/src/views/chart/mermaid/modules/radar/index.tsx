import React from 'react'

export default function Radar() {
  const conf = {
    title: 'Basic Radar Chart',
    radar: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 },
    ],
    items: [
      {
        value: [4200, 3000, 20000, 35000, 50000, 18000],
        name: 'Allocated Budget',
      },
      {
        value: [5000, 14000, 28000, 26000, 42000, 21000],
        name: 'Actual Spending',
      },
    ],
  }
  const r = 320
  const len = conf.radar.length
  const angleItem = 360 / len

  const get_d = (i: number, per: number = 1) => {
    const part = (len - per) / len
    const angle = angleItem + angleItem * i
    const x0 = (r * part) * Math.sin(((angle - angleItem) * Math.PI) / 180)
    const y0 = (-r * part) * Math.cos(((angle - angleItem) * Math.PI) / 180)
    const x = (r * part) * Math.sin((angle * Math.PI) / 180)
    const y = (-r * part) * Math.cos((angle * Math.PI) / 180)
    const d = `M 0,0 ${x0},${y0} ${x},${y} Z`
    // console.log(x, y)
    return d
  }

  return (
    <div className="animation__mermaid-radar">
      <div className="">
        <svg className="w-150 h-150 bg-white/10 rounded-2xl">
          <g transform="translate(300, 300)">
            {conf.radar.map((_item, i) => (
              <React.Fragment key={i}>
                <path d={get_d(i)} stroke="#fff" fill="none" />
                <path d={get_d(i, 2)} stroke="#fff" fill="none" />
                <path d={get_d(i, 3)} stroke="#fff" fill="none" />
                <path d={get_d(i, 4)} stroke="#fff" fill="none" />
                <path d={get_d(i, 5)} stroke="#fff" fill="none" />
              </React.Fragment>
            ))}
          </g>
        </svg>
      </div>
    </div>
  )
}
