import React from 'react'
import { isArray, isObject, isString } from 'asura-eye'

export function Render(props) {
  const { json } = props
  if (isString(json))
    return <div className="flex items-center flex-col justify-center h-full">{json}</div>
  if (isArray(json)) {
    return (
      <div className="border-white/50 border p-2! text-center">
        {json.map((j, i) => (
          <Render key={i} json={j} />
        ))}
      </div>
    )
  }
  if (isObject(json)) {
    const keys = Object.keys(json)
    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${keys.length}, auto)`,
          gridTemplateRows: `auto 1fr`,
        }}
      >
        {keys.map((key, i) => {
          return (
            <React.Fragment key={key}>
              <div
                className="key text-center border border-white/50 p-3! border-b-0"
                style={{
                  gridArea: `1 / ${i + 1} / 2 / ${i + 2}`,
                }}
              >
                {key}
              </div>
              <div
                className="value border border-white/50 p-2!"
                style={{
                  gridArea: `2 / ${i + 1} / 3 / ${i + 2}`,
                }}
              >
                <Render json={json[key]} />
              </div>
            </React.Fragment>
          )
        })}
      </div>
    )
  }
  return <div>{JSON.stringify(json)}</div>
}
