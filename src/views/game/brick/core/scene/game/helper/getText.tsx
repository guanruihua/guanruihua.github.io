import { Texts } from '../type'

export const getText = (scene: Phaser.Scene): Texts => {
  // Create opening text
  const opening = scene.add.text(
    scene.physics.world.bounds.width / 2,
    scene.physics.world.bounds.height / 2,
    'Press SPACE to Start',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '12px',
      // color: '#F60000',
      // fill: '#fff',
    },
  )
  // opening.setVisible(false)
  /**
   * The origin of the text object is at the top left, change the origin to the
   * center so it can be properly aligned
   */
  opening.setOrigin(0.5)

  // Create game over text
  const gameOver = scene.add.text(
    scene.physics.world.bounds.width / 2,
    scene.physics.world.bounds.height / 2,
    'Game Over',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '50px',
      color: '#F60000',
      // stroke: '#F60000',
      // fill: '#fff',
    },
  )

  gameOver.setOrigin(0.5)

  // Make it invisible until the player loses
  gameOver.setVisible(false)

  // Create the game won text
  const playerWon = scene.add.text(
    scene.physics.world.bounds.width / 2,
    scene.physics.world.bounds.height / 2,
    'You won!',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '50px',
      // fill: '#fff',
    },
  )

  playerWon.setOrigin(0.5)

  // Make it invisible until the player wins
  playerWon.setVisible(false)

  return {
    opening,
    gameOver,
    playerWon,
  }
}
