import { useSetState } from '0hook'
import React from 'react'

const Items = [
  'color',
  // 'background', 'border', 'flex', 'grid'
]

export const usePageState = () => {
  const [state, setState] = useSetState({
    select: Items[0],
  })
  const init = () => {}

  React.useEffect(init, [])
  return { Items, state, setState }
}
