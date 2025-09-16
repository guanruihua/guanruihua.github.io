import { Text } from './type'

export const MenuScene = (): Phaser.Types.Scenes.SceneType => {
  let text: Text = null
  let button: Text = null

  function create() {
    const scene = this as Phaser.Scene
    // text = scene.add.text(400, 300, '菜单', { fontSize: '32px' }).setOrigin(0.5)
    button = scene.add
      .text(400, 350, 'Start', { fontSize: '32px', color: '#FFFFFF' })
      .on('pointerover', () => {
        button?.setStyle({ fill: '#8FB4F8', fontSize: '32px' })
        scene.sys.canvas.classList.add('pointer')
      })
      .on('pointerout', () => {
        button?.setStyle({ fill: '#FFFFFF', fontSize: '32px' })
        scene.sys.canvas.classList.remove('pointer')
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('game')
      })
  }

  return {
    key: 'menu',
    active: true,
    create,
  }
}
