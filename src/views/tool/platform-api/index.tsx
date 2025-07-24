import React from 'react'
import { useSetState } from '0hook'
import { getList } from './conf'
import { Content } from './content'
import './index.less'
import { List } from './list'

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
        if (type) {
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
