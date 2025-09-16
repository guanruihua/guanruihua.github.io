import { GameScene } from './scene/game'
import { MenuScene } from './scene/menu'

export const init = (Phaser: any, parent: HTMLDivElement) => {
  // This object contains all the Phaser configurations to load our game
  const config: Phaser.Types.Core.GameConfig = {
    /**
     * The type can be Phaser.CANVAS, Phaser.WEBGL or Phaser.AUTO. AUTO means that
     * Phaser will try to render with WebGL, and fall back to Canvas if it fails
     */
    type: Phaser.AUTO,
    // Parent element to inject the Canvas/WebGL element with the game
    parent,
    // parent: 'game',
    // parent: containerRef.current,
    width: 800,
    // width: 1200,
    height: 640,
    scale: {
      // Ensure the canvas is resized to fit the parent div's dimensions
      // mode: Phaser.Scale.RESIZE,
      // Center the game canvas both horizontally and vertically within the parent
      // autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    /**
     * A scene is "self-contained" game world - all the logic and state of a game
     * component. For e.g. it's common to a game menu to be one scene, whereas the
     * first level is another scene. Phaser has a Scene object, but we can provide
     * a regular JS object with these function names:
     */
    scene: [MenuScene(), GameScene()],
    /**
     * The physics engine determines how objects interact with the world. Phaser
     * supports three physics engines out of the box: arcade, impact and matter.
     * Arcade is understood to be the simplest one to implement
     */
    physics: {
      default: 'arcade',
    },
  }
  const game: Phaser.Game = new Phaser.Game(config)

  console.log(game)
}
