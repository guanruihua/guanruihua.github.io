import React from 'react'
import { useSetState } from '0hook'
import { getList } from './conf'
import { Content } from './modules/content'
import './index.less'
import { List } from './modules/list'

export default function () {
  const [state, setState] = useSetState(
    {
      list: getList(),
      selectId: '1',
      lastUpdate: Date.now(),
    },
    'tool/platform-api/cache',
  )

  const handleEdit = (type: string, newVal: any, id?: string) => {
    if (!state.selectId) return

    const newList =
      state.list?.map((item: any) => {
        if (item.id !== state.selectId) return item
        if (type === 'results') {
          if (!item.results) item.results = []
          if (id) {
            item.results = item.results.map((row: any) => {
              if (row[0] === id) row[1] = newVal
              return row
            })
          } else {
            item.results.unshift([Date.now(), newVal])
          }
          if (item.results.length > 30) {
            item.results = item.results.slice(0, 30)
          }
        } else if (type) {
          item[type] = newVal

          return item
        }
        return item
      }) || []

    setState({
      lastUpdate: Date.now(),
      list: newList,
    })
  }

  // console.log(state)

  return (
    <div className="tool-platform-api">
      <div className="container">
        <List state={state} setState={setState} />
        <Content key={state.selectId} state={state} handleEdit={handleEdit} />
      </div>
    </div>
  )
}
