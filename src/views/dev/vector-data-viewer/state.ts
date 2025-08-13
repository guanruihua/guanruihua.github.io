import React from 'react'
import { useSetState } from '0hook'
import { ObjectType } from '0type'
import { req } from '@/util'

export interface PageState {
  active: string
  databaseName: string
  selectTableName: string
  tableNames: string[]
  dataSource: ObjectType[]
}

export const usePageState = () => {
  const cacheKey = 'tool/vector-data-viewer|cache'
  const [state, setState] = useSetState<PageState>(
    {
      active: 'vector-data',
      databaseName: 'lanceDB',
      selectTableName: '',
      tableNames: [],
      dataSource: [],
    },
    cacheKey,
  )
  const getCacheValue = () => {
    const cache = localStorage.getItem(cacheKey) || '{}'
    try {
      return JSON.parse(cache)
    } catch (error) {}
    return {}
  }

  const handleSelectTableName = async (name: string) => {
    setState({ selectTableName: name })

    const res = await req({
      method: 'get',
      url: 'http://localhost:2400/vector/table/get',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { name },
    })
    const { data } = res?.data || {}
    if (data) {
      const newData = data?.map((item: any) => {
        const { id, text } = item
        return { id, text }
      })
      setState({ selectTableName: name, dataSource: newData })

      // console.log(newData)
    }
  }

  const init = async () => {
    const newState: PageState = getCacheValue()
    const res = await req({
      url: 'http://localhost:2400/vector/tableNames',
      method: 'get',
    })
    newState.tableNames = res?.data?.data || []

    // console.log('init ...', res.data?.data)
    setState(newState)
  }

  React.useEffect(() => {
    state.active === 'vector-data' && init()
  }, [state.active])

  return {
    state,
    setState,
    handleSelectTableName,
  }
}
