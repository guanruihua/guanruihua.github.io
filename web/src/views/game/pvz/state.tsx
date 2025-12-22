import { useSetState } from '0hook'
import React from 'react'
import { usePhaser } from './hook'

export const usePageState = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { Phaser } = usePhaser()
  const [state, setState] = useSetState({})

  const init = () => {
    if (!Phaser) return
  }

  React.useEffect(() => {
    if (!Phaser || !containerRef.current) return
    const container = containerRef.current
    init()
    let gameOptions: any = {
      tileSize: 200,
      colors: {
        0: 0xffffff,
        2: 0xffffff,
        4: 0xffeeee,
        8: 0xffdddd,
        16: 0xffcccc,
        32: 0xffbbbb,
        64: 0xffaaaa,
        128: 0xff9999,
        256: 0xff8888,
        512: 0xff7777,
        1024: 0xff6666,
        2048: 0xff5555,
        4096: 0xff4444,
        8192: 0xff3333,
        16384: 0xff2222,
        32768: 0xff1111,
        65536: 0xff0000,
      },
      tweenSpeed: 50,
    }
    var playGame = new Phaser.Class({
      Extends: Phaser.Scene,
      initialize: function playGame() {
        Phaser.Scene.call(this, { key: 'PlayGame' })
      },
      preload: function () {
        // this.load.image('tile', './tile.png')
        // this.load.image('tile', tile)
      },
    })
    var gameConfig = {
      type: Phaser.WEBGL,
      width: gameOptions.tileSize * 4,
      height: gameOptions.tileSize * 4,
      backgroundColor: 0x444444,
      scene: [playGame],
    }
    let game = new Phaser.Game(gameConfig)
    function resize() {
      var canvas = document.querySelector('canvas')
      if (!canvas) return
      var windowWidth = window.innerWidth
      var windowHeight = window.innerHeight
      var windowRatio = windowWidth / windowHeight
      var gameRatio = game.config.width / game.config.height
      if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + 'px'
        canvas.style.height = windowWidth / gameRatio + 'px'
      } else {
        canvas.style.width = windowHeight * gameRatio + 'px'
        canvas.style.height = windowHeight + 'px'
      }
    }
    resize()
    window.addEventListener('resize', resize, false)
    console.log(Phaser)
  }, [Phaser, containerRef.current])

  return {
    containerRef,
    state,
    setState,
  }
}
