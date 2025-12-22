export type Sprite = Phaser.Physics.Arcade.Sprite | null | undefined
export type Group = Phaser.Physics.Arcade.Group | null | undefined
export type KeyboardPlugin =
  | Phaser.Types.Input.Keyboard.CursorKeys
  | null
  | undefined
export type Text = Phaser.GameObjects.Text | null | undefined
export type Texts = {
  opening: Text
  gameOver: Text
  playerWon: Text
}
