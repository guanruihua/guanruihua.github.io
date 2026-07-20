// #App结构 - 图形编辑器 [editor]
import { App, Frame, Rect } from 'leafer-ui'

export const demo0 = (app: App) => {
  app.tree.add(
    Frame.one(
      {
        // 页面内容
        children: [
          Rect.one(
            { editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] },
            100,
            100,
          ),
          Rect.one(
            { editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] },
            300,
            100,
          ),
        ],
      },
      10,
      10,
      1500,
      600,
    ),
  )
}
