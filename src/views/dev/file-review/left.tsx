import { Div } from 'aurad'
import React from 'react'

export interface LeftProps {
  fileTypes: string[]
  [key: string]: any
}

export function Left(props: LeftProps) {
  const { fileTypes, state, setState } = props

  return (
    <div className="left-aside">
      <div className="file-type-box">
        {fileTypes.map((item) => {
          return (
            <Div
              key={item}
              className="file-type"
              classNames={{ select: state.selectFileType === item }}
              onClick={() => setState({ selectFileType: item })}
            >
              {item}
            </Div>
          )
        })}
      </div>
    </div>
  )
}
