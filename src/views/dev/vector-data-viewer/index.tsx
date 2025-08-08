import React from 'react'
import { useSetState } from '0hook'
import './index.less'

export default function () {
  const [state, setState] = useSetState(
    {
      databaseName: 'lanceDB',
      tables: [],
    },
    // 'tool/vector-data-viewer/cache',
  )

  return (
    <div className="tool-vector-data-viewer">
      <h3 className='title'>{state.databaseName}</h3>
      <div className="viewer-box">
        <div className="left-aside"></div>
        <div className="content"></div>
      </div>
    </div>
  )
}
