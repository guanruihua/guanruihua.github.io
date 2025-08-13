import React from 'react'
import './index.less'
import { usePageState } from './state'
import { Div } from 'aurad'

export default function () {
  const { state, setState, handleSelectTableName } = usePageState()

  return (
    <div className="tool-vector-data-viewer">
      <h3 className="title">{state.databaseName}</h3>
      <div className="viewer-box">
        <div className="left-aside">
          <div className="table-name-box">
            {state?.tableNames?.map((name) => {
              return (
                <Div
                  key={name}
                  className="table-name"
                  classNames={{
                    select: name === state.selectTableName,
                  }}
                  onClick={() => handleSelectTableName(name)}
                >
                  {name}
                </Div>
              )
            })}
          </div>
        </div>
        <div className="content">
          <div className="data-viewer">
            <div className="header no">No.</div>
            <div className="header id">ID</div>
            <div className="header text">Text</div>
            {state?.dataSource?.map((item, i) => {
              const { id, text } = item
              return (
                <React.Fragment key={id}>
                  <div className="no">{i + 1}</div>
                  <div className="id">{id}</div>
                  <div className="text">{text}</div>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
