import React from 'react'
import { useSetState } from '0hook'
import { ObjectType } from '0type'
import { req } from '@/util'
import { isArray } from 'asura-eye'

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

  const handleRefresh = async (type: string = 'table') => {
    if (type === 'table' && state.selectTableName) {
      handleSelectTableName(state.selectTableName)
    }
    if (type === 'tableNames') {
      const newState: PageState = getCacheValue()
      const res = await req({ url: 'vector/tableNames' })
      const value = res?.data?.data
      // console.log(value)
      if (value) {
        newState.tableNames = value || []

        // console.log('init ...', res.data?.data)
        newState.selectTableName = value?.[0] || ''
        if (newState.selectTableName) {
          const res = await req({
            url: '/vector/table/get',
            params: {
              name: newState.selectTableName,
            },
          })
          const { data } = res?.data || {}
          // console.log(data)
          if (data) {
            newState.dataSource = data?.map((item: any) => {
              const { id, text, key } = item
              return { id, text, key }
            })

            // console.log(newData)
          }
        }
        setState(newState)
      }
    }
  }

  const handleClearTableData = async () => {
    const res = await req({
      method: 'post',
      url: '/vector/clearTable',
      params: {
        tableName: state.selectTableName,
      },
    })
    console.log(res?.data)
    await handleRefresh('table')
  }
  const handleDelTable = async () => {
    const res = await req({
      method: 'post',
      url: '/vector/delTable',
      params: {
        tableName: state.selectTableName,
      },
    })
    console.log(res?.data)
    await handleRefresh('tableNames')
  }

  const handleDelTableData = async (data: any) => {
    const res = await req({
      method: 'post',
      url: '/vector/delTableData',
      params: {
        tableName: state.selectTableName,
        data: isArray(data) ? data : [data],
      },
    })
    console.log(res?.data)
    await handleRefresh('table')
  }
  const handleDelDuplicates = async () => {}

  const handleSelectTableName = async (name: string) => {
    setState({ selectTableName: name })

    const res = await req({
      url: '/vector/table/get',
      params: { name },
    })
    const { data } = res?.data || {}
    if (data) {
      const newData = data?.map((item: any) => {
        const { id, text, key } = item
        return { id, text, key }
      })
      setState({ selectTableName: name, dataSource: newData })

      // console.log(newData)
    }
  }

  const init = async () => {
    const newState: PageState = getCacheValue()
    const res = await req({ url: 'vector/tableNames' })
    const value = res?.data?.data
    if (value) {
      newState.tableNames = value || []

      // console.log('init ...', res.data?.data)
      setState(newState)
    }
  }

  React.useEffect(() => {
    state.active === 'vector-data' && init()
  }, [state.active])

  return {
    state,
    setState,
    handleSelectTableName,
    handleClearTableData,
    handleRefresh,
    handleDelTable,
    handleDelTableData,
    handleDelDuplicates,
  }
}
