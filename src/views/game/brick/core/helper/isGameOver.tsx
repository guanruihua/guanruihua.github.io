/**
 * Checks if the user lost the game
 * @param world - the physics world
 * @return {boolean}
 */
export function isGameOver(ball: any, world: any): boolean {
  if (!ball?.body || !world?.bounds) return false
  return ball.body.y > world.bounds.height
}
