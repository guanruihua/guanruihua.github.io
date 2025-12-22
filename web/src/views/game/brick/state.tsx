import { useSetState } from '0hook'
import React from 'react'
import { usePhaser } from '../hook'
import { init } from './core'

export const usePageState = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { Phaser } = usePhaser()
  const [state, setState] = useSetState({})

  React.useEffect(() => {
    if (!Phaser || !containerRef.current) return
    
    init(Phaser, containerRef.current)
  }, [Phaser, containerRef.current])

  return {
    containerRef,
    state,
    setState,
  }
}
