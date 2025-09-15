import { Sprite, Group, KeyboardPlugin, Texts } from './type'
import { preload, hitBrick, hitPlayer, isGameOver, isWon } from './helper'
import { getBricks } from './helper/getBricks'
import { getText } from './helper/getText'

export const init = (Phaser: any, parent: HTMLDivElement) => {
  // Game objects are global variables so that many functions can access them
  let player: Sprite = null
  let ball: Sprite = null

  let bricks: Group[] = []
  let cursors: KeyboardPlugin = null
  // Variable to determine if we started playing
  let gameStarted: boolean = false
  // Add global text objects
  let texts: Texts = {
    opening: null,
    gameOver: null,
    playerWon: null,
  }

  /**
   * We create our game world in this function. The initial state of our game is
   * defined here. We also set up our physics rules here
   */
  function create() {
    const scene = this as Phaser.Scene
    /**
     * Coordinates start at 0,0 from the top left
     * As we move rightward, the x value increases
     * As we move downward, the y value increases.
     */
    player = scene.physics.add.sprite(
      400, // x position
      600, // y position
      'paddle', // key of image for the sprite
    )

    // Let's add the ball
    ball = scene.physics.add.sprite(
      400, // x position
      565, // y position
      'ball', // key of image for the sprite
    )

    // Add violet bricks
    bricks = getBricks(scene)

    // Manage key presses
    cursors = scene.input.keyboard?.createCursorKeys()

    // Ensure that the player and ball can't leave the screen
    // 确保球员和球不能离开屏幕
    player?.setCollideWorldBounds(true)
    ball?.setCollideWorldBounds(true)
    /**
     * The bounce ensures that the ball retains its velocity after colliding with
     * an object.
     */
    ball?.setBounce(1, 1)

    /**
     * Disable collision with the bottom of the game world. This needs to be added
     * so the ball falls to the bottom, which means that the game is over
     */
    scene.physics.world.checkCollision.down = false

    // Add collision for the bricks
    // 为砖块添加碰撞
    bricks.forEach((brick: Group) => {
      if (ball && brick)
        scene.physics.add.collider(ball, brick, hitBrick, undefined, scene)
    })

    // Make the player immovable / 让玩家无法移动
    player.setImmovable(true)
    // Add collision for the player
    scene.physics.add.collider(ball, player, hitPlayer, undefined, scene)

    texts = getText(scene)
  }

  /**
   * Our game state is updated in this function. This corresponds exactly to the
   * update process of the game loop
   */
  function update() {
    if (!player?.body || !ball || !cursors) {
      return
    }
    // Check if the ball left the scene i.e. game over
    if (isGameOver(ball, this.physics.world)) {
      texts.gameOver?.setVisible(true)
      ball.disableBody(true, true)
    } else if (isWon(bricks)) {
      texts.playerWon?.setVisible(true)
      ball.disableBody(true, true)
    } else {
      // Put this in so that the player doesn't move if no key is being pressed
      player.setVelocityX(0)

      /**
       * Check the cursor and move the velocity accordingly. With Arcade Physics we
       * adjust velocity for movement as opposed to manipulating xy values directly
       */
      if (cursors.left.isDown) {
        player.setVelocityX(-350)
      } else if (cursors.right.isDown) {
        player.setVelocityX(350)
      }

      // The game only begins when the user presses Spacebar to release the paddle
      if (!gameStarted) {
        // The ball should follow the paddle while the user selects where to start
        ball.setX(player.x)

        if (cursors.space.isDown) {
          gameStarted = true
          ball.setVelocityY(-200)
          texts.opening?.setVisible(false)
        }
      }
    }
  }

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
    scene: {
      preload,
      create,
      update,
    },
    /**
     * The physics engine determines how objects interact with the world. Phaser
     * supports three physics engines out of the box: arcade, impact and matter.
     * Arcade is understood to be the simplest one to implement
     */
    // context: {
    //   willReadFrequently: true,
    // },
    physics: {
      default: 'arcade',
      // arcade: {
      //   gravity: false,
      // },
    },
  }
  const game: Phaser.Game = new Phaser.Game(config)

  console.log(game)
}
