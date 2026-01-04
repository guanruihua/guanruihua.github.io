import React from 'react'
import { useSetState } from '0hook'
import { ObjectType } from '0type'

export const usePageState = () => {
  const [state, _setState] = useSetState({
    img: '/image/t3.jpg',
    perspective: 1000,
    offsetValue: 2,
    rotateX: 20,
    rotateY: -10,
  })

  const setState = (newState: ObjectType) => {
    const keys = Object.keys(newState)
    const scene: HTMLDivElement | null = document.querySelector('.scene')
    const container: HTMLDivElement | null =
      document.querySelector('.image-container')
      
    if (scene && container) {
      if (keys.includes('perspective')) {
        const value = newState.perspective || 0
        scene.style.perspective = value + 'px'
      }
      if (keys.includes('offsetValue')) {
        const value = newState.offsetValue || 0
        container.style.setProperty('--layer-offset', value + 'px')
      }
      if (keys.includes('rotateX') || keys.includes('rotateY')) {
        const x = newState.rotateX ?? state.rotateX ?? 0
        const y = newState.rotateY ?? state.rotateY ?? 0
        container.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`
      }
    }
    _setState(newState)
  }

  return {
    state,
    setState,
  }
}
