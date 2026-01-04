import ball from '../assets/images/ball_32_32.png'
import paddle from '../assets/images/paddle_128_32.png'
import brick1 from '../assets/images/brick1_64_32.png'
import brick2 from '../assets/images/brick2_64_32.png'
import brick3 from '../assets/images/brick3_64_32.png'
/**
 * The function loads assets as Phaser begins to run the scene. The images are
 * loaded as key value pairs, we reference the assets by their keys of course
 */
export function preload() {
  this.load.image('ball', ball)
  this.load.image('paddle', paddle)
  this.load.image('brick1', brick1)
  this.load.image('brick2', brick2)
  this.load.image('brick3', brick3)
}
