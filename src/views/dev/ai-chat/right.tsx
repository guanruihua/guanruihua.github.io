import React from 'react'

export interface RightProps {
  Suggest: any[]
  [key: string]: any
}

export function Right(props: RightProps) {
  const { handleUserChat, Suggest } = props
  return (
    <div className="right-aside">
      <div className="suggest-box">
        {Suggest.map((s, i) => {
          const { value, label } = s
          return (
            <div
              key={i}
              className="suggest-item"
              onClick={() => handleUserChat(label)}
            >
              {label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
