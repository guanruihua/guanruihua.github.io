import React from 'react'
import { useSetState } from '0hook'
import { getEdges } from './utils'
import { useEventListener } from '0hook'
import type { Node, PageState } from './type'

interface UsePageStateProps {
  nodes: Node[]
}

export const usePageState = (props: UsePageStateProps) => {
  const { nodes } = props
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [state, setState] = useSetState<PageState>({
    nodes,
    edges: [],
    offset: {
      x: 900,
      y: 100,
    },
    rootRect: {},
    nodeRect: {},

    status: {
      1: 'success',
      '1-2': 'success',
      2: 'error',
      '2-3': 'error',
      3: 'error',
      4: 'success',
      5: 'success',
      6: 'success',
      7: 'success',
      8: 'success',
    },

    dialog: {
      // open: false,
      open: false,
      node: {},
    },
    lastUpdate: 0,
  })

  const load = () => {
    const newState: PageState = {
      ...state,
      rootRect: rootRef.current.getBoundingClientRect(),
      edges: getEdges(rootRef, nodes),
      lastUpdate: Date.now(),
    } as PageState

    setState(newState)
  }

  useEventListener('resize', load)

  // console.log('state/nodeRect:', state.nodeRect)

  return {
    rootRef,
    state,
    setState,
  }
}
