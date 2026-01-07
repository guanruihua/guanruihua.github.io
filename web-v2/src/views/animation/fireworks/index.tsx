import './index.less'
import { usePageState } from './state'

export default function Fireworks() {
  usePageState()
  return (
    <div className="animation__fireworks">
      <div className="sky">
        <canvas id="fw"></canvas>

        <div id="year" className="year hidden gradient-text">
          2026
        </div>

        <div id="wish" className="wish hidden gradient-text">
          May your year move with clarity and courage ✨
        </div>

        <div id="pudgy" className="pudgy hidden">
          <img
            src="https://assets.codepen.io/11990995/Happy-Turn-Around-Sticker-by-Pudgy-Penguins.gif"
            alt="Pudgy"
          />
        </div>

        <div id="flash" className="flash hidden"></div>
      </div>
    </div>
  )
}
