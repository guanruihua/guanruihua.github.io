import { usePageState } from './hook'
import './index.less'

// leaferjs
// https://www.leaferjs.com/ui/guide/
// https://www.leaferjs.com/ui/guide/plugin/editor.html
export default function Demo_leaferjs_editor() {
  usePageState()

  return (
    <div className="demo__leaferjs-editor">
      <div className="leafer"></div>
    </div>
  )
}
