/**
 * The function handles the collision between the ball and the player. We want
 * to ensure that the ball's direction after bouncing off the player is based
 * on which side of the player was hit. Also, to make things more difficult, we
 * want to increase the ball's velocity when it's hit.
 * @param ball - the ball sprite
 * @param player - the player/paddle sprite
 */
export function hitPlayer(ball: any, player: any) {
  // Increase the velocity of the ball after it bounces
  ball.setVelocityY(ball.body.velocity.y - 5)

  let newXVelocity = Math.abs(ball.body.velocity.x) + 5
  // If the ball is to the left of the player, ensure the x velocity is negative
  if (ball.x < player.x) {
    ball.setVelocityX(-newXVelocity)
  } else {
    ball.setVelocityX(newXVelocity)
  }
}
