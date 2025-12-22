/**
 * This function handles the collision between a ball and a brick sprite
 * In the create function, ball is a sprite and violetBricks, yellowBricks and
 * redBricks are sprite groups. Phaser is smart enough to handle the collisions
 * for each individual sprite.
 * @param ball - the ball sprite
 * @param brick - the brick sprite
 */
export function hitBrick(ball: any, brick: any) {
  // if (!ball?.body || !brick?.body) return
  brick.disableBody(true, true)
  let randNum = 0

  if (ball.body.velocity.x == 0) {
    randNum = Math.random()
    if (randNum >= 0.5) {
      ball.setVelocityX(150)
    } else {
      ball.setVelocityX(-150)
    }
  }
}
