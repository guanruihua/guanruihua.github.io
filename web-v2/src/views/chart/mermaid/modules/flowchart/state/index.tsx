import { useSetState } from '0hook'
import React from 'react'
import { PageState } from '../../component'
import {} from '0hook'
import {} from 'harpe'
import { nodes } from '../conf'
import { genData } from './gen-data'
import { genLayout } from './gen-layout'

export const usePageState = () => {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [status, setStatus] = useSetState({
    initData: false,
    initRect: false,
    updateRender: -1,
  })

  const [state, setState] = useSetState<PageState>({
    nodes: [],
    edges: [],
    Next: {},
  })

  const [layout, setLayout] = useSetState<PageState>({
    Next: {},
    Rect: {},
    rootRect: {},
    layout: {},
  })

  const initData = async () => {
    console.log('init data')
    setStatus({
      initData: false,
      initRect: false,
      updateRender: -1,
    })
    const newState = await genData(nodes)
    setState(newState)
    setStatus({
      initData: true,
      initRect: false,
      updateRender: -1,
    })
  }

  React.useEffect(() => {
    !status.initData && initData()
  }, [nodes, status.initData])

  const initLayout = async () => {
    console.log('init rect')
    const newLayout = await genLayout(state, rootRef)
    setStatus({
      initData: true,
      initRect: true,
      updateRender: -1,
    })
    setLayout(newLayout)
  }

  React.useEffect(() => {
    status.initData && !status.initRect && initLayout()
  }, [status.initData, status.initRect, status.updateRender])

  // const reload = async () => {
  //   console.log('update render')
  // }

  // React.useEffect(() => {
  //   if (status.initRect && status.initData) reload()
  // }, [status.initRect, status.updateRender])

  // console.log(state, layout)

  return {
    rootRef,
    layout,
    state,
    setState,
  }
}
