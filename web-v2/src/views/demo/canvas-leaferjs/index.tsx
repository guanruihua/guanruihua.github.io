import { usePageState } from './hook'
import './index.less'

// leaferjs
// https://www.leaferjs.com/ui/guide/
export default function Demo_leaferjs() {
  usePageState()

  return (
    <div className="demo__leaferjs">
      <div className="leafer"></div>
    </div>
  )
}
