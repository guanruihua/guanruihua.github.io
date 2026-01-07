import './index.less'
import { usePageState } from './state'
import { default as Image } from './image.png'

export default function () {
  usePageState()
  return (
    <div className="animation__good-place">
      <div className="container">
        <img id="base" src={Image} />
        <div id="fire-container"></div>
        <div id="fire-container-2"></div>
        <div id="fire-container-3"></div>
      </div>
    </div>
  )
}
