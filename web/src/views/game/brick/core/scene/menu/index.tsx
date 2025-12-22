import { isNumber } from 'asura-eye'
import { Text } from './type'
import { preload } from './helper/preload'

export const MenuScene = (
  config: Phaser.Types.Core.GameConfig,
): Phaser.Types.Scenes.SceneType => {
  let text: Text = null
  let button: Text = null

  const getConf = () => {
    const { width, height } = config

    return {
      ...config,
      width: isNumber(width) ? width : Number(width),
      height: isNumber(height) ? height : Number(height),
    }
  }
  const { width, height } = getConf()

  function create() {
    const _this = this as Phaser.Scene
    _this.cameras.main.setBackgroundColor('#111111')
    const bg = _this.add.image(width, height, 'bg').setOrigin(0.5).setDepth(-1)

    const scale = Math.max(width / bg.width, height / bg.height)
    bg.setScale(scale).setPosition(width / 2, height / 2)
    bg.setAlpha(0.3)

    const style = {
      fontSize: '32px',
    }
    button = _this.add
      .text(width / 2, height / 2, 'Start', { ...style, color: '#FFFFFF' })
      .on('pointerover', () => {
        button?.setStyle({ ...style, fill: '#8FB4F8' })
        _this.sys.canvas.classList.add('pointer')
      })
      .on('pointerout', () => {
        button?.setStyle({ ...style, fill: '#FFFFFF' })
        _this.sys.canvas.classList.remove('pointer')
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        _this.scene.stop('menu')
        _this.scene.start('game')
      })
    _this.scene.stop('menu')
    _this.scene.start('game')
  }
  return {
    key: 'menu',
    active: true,
    create,
    preload,
  }
}
