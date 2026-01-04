import { Group } from '../type'
/**
 * Checks if the user won the game
 * @return {boolean}
 */
export function isWon(
  bricks: Group[],
  // violetBricks: Group,
  // yellowBricks: Group,
  // redBricks: Group,
): boolean {
  let total = -1
  bricks.forEach((brick) => {
    if (!brick) return
    if (total === -1) {
      total = brick.countActive()
      return
    }
    total += brick.countActive()
  })
  return total === 0
  // if (!violetBricks || !yellowBricks || !redBricks) return false
  // return (
  //   violetBricks.countActive() +
  //     yellowBricks.countActive() +
  //     redBricks.countActive() ==
  //   0
  // )
}
