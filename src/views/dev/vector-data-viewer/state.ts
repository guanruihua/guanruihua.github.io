import React from 'react'
import { useSetState } from '0hook'
import axios from 'axios'
import { ObjectType } from '0type'

export interface PageState {
  databaseName: string
  selectTableName: string
  tableNames: string[]
  dataSource: ObjectType[]
}

export const usePageState = () => {
  const cacheKey = 'tool/vector-data-viewer|cache'
  const [state, setState] = useSetState<PageState>(
    {
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
  const init = async () => {
    const newState: PageState = getCacheValue()
    const res = await axios({
      url: 'http://localhost:2400/vector/tableNames',
      method: 'get',
    })
    newState.tableNames = res?.data?.data || []

    console.log('init ...', res.data)
    setState(newState)
  }

  const handleSelectTableName = async (name: string) => {
    setState({ selectTableName: name })

    const res = await axios({
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

  React.useEffect(() => {
    init()
  }, [])

  return {
    state,
    setState,
    handleSelectTableName,
  }
}
