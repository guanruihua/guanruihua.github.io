import React from 'react'
import { useLoadJS } from '@/hook'
import { CardStreamController } from './core/CardStreamController'
import { ParticleScanner } from './core/ParticleScanner'
import { ParticleSystem } from './core/ParticleSystem'

export const usePageState = () => {
  let cardStream: any = null

  function toggleAnimation() {
    if (cardStream) {
      cardStream.toggleAnimation()
    }
  }

  function resetPosition() {
    if (cardStream) {
      cardStream.resetPosition()
    }
  }

  function changeDirection() {
    if (cardStream) {
      cardStream.changeDirection()
    }
  }

  useLoadJS('/js/three.r128.min.js', () => {
    console.log('load')

    const codeChars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/"\'`~?'

    const scannerLeft = window.innerWidth / 2 - 2
    const scannerRight = window.innerWidth / 2 + 2

    let particleSystem: any = null

    let particleScanner: any = null
    const _window: any = window
    cardStream = new CardStreamController()
    particleSystem = new ParticleSystem()
    particleScanner = new ParticleScanner()
    _window.setScannerScanning = (active: any) => {
      if (particleScanner) {
        particleScanner.setScanningActive(active)
      }
    }
    _window.getScannerStats = () => {
      if (particleScanner) {
        return particleScanner.getStats()
      }
      return null
    }
    // document.addEventListener('DOMContentLoaded', () => {
    // })
  })

  return {
    toggleAnimation,
    resetPosition,
    changeDirection,
  }
}
