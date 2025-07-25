import React from 'react'
import { Button, Div } from 'aurad'
import { HEADERS } from '../conf'

export interface ListProps {
  state: any
  setState: any
  [key: string]: any
}

export function List(props: ListProps) {
  const { state, setState } = props
  return (
    <div className="list">
      <Button
        onClick={() => {
          const newList = state.list
          const id = Date.now().toString()
          newList.push({
            id,
            title: 'TMP',
            method: 'post',
            url: 'http://localhost:8080/',
            headerTxt: HEADERS,
            bodyTxt: '{}',
            paramsTxt: '{}',
            resultTxt: '{}',
            results: [],
          })
          setState({
            list: newList,
            selectId: id,
          })
        }}
      >
        Add
      </Button>
      <div className="list-box">
        {state.list?.map((item: any, i: number) => {
          const { id = String(i), method = 'post', title = 'Template' } = item
          return (
            <Div
              key={id}
              className="item"
              classNames={{ select: id === state.selectId }}
              onClick={() => {
                setState({ lastUpdate: +Date.now(), selectId: id })
              }}
            >
              <Div className="method" classNames={[method]}>
                {method}
              </Div>
              <Div className="title">{title}</Div>
            </Div>
          )
        })}
      </div>
    </div>
  )
}
