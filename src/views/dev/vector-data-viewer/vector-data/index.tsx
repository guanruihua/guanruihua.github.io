import { Button, Div, Flex } from 'aurad'
import React from 'react'
import './index.less'

export interface VectorDataProps {
  h: any
  [key: string]: any
}

export function VectorData(props: VectorDataProps) {
  const { h } = props
  const { state, setState, handleSelectTableName } = h

  return (
    <div className="tool-vector-data-viewer__vector-data">
      <div className="left-aside">
        <div className="table-name-box">
          {state?.tableNames?.map((name: string) => {
            return (
              <Div
                key={name}
                className="table-name item"
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
        <Flex style={{ paddingBottom: 10 }}>
          <Button>Refresh</Button>
          <Button>Remove Duplicates</Button>
          <Button>Clear Table</Button>
          <Button>Del Table</Button>
        </Flex>
        <div className="data-viewer">
          <div className="header item no">No.</div>
          <div className="header item id">ID</div>
          <div className="header item text">Text</div>
          <div className="header"></div>
          {state?.dataSource?.map((item: any, i: number) => {
            const { id, text } = item
            return (
              <React.Fragment key={id}>
                <div className="item no">{i + 1}</div>
                <div className="item id">{id}</div>
                <div className="item text">{text}</div>
                <Button>Del</Button>
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
