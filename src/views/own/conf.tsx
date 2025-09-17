import { DevRouter } from '../dev/router'
import { GameRouter } from '../game/router'
import { ToolRouter } from '../tool/router'

export const Conf = [
  {
    title: 'Own',
    name: 'own',
    group: [
      ['Github', 'https://github.com/guanruihua/'],
      ['Note', 'https://ruihuag-note.github.io/'],
      ['Demo', 'https://ruihuag-demo.github.io/'],
      ['0static', 'https://0static.github.io/'],
      ['Sandbox', 'https://ruihuag-sandbox.github.io/'],
    ],
  },
  {
    title: 'Tool',
    name: 'tool',
    group: ToolRouter.map((item) => [item.title, 'tool/' + item.path]),
  },
  {
    title: 'Other',
    name: 'other',
    group: [['HTTP 状态码', 'other/http-status']],
  },
  {
    title: 'Dev',
    name: 'dev',
    group: DevRouter.map((item) => [item.title || item.path, 'dev/' + item.path]),
  },
  {
    title: 'CSS',
    name: 'css',
    group: [
      ['双引号样式', 'study/css-q-quotes'],
      ['flex', 'study/css-flex'],
      ['grid', 'study/css-grid'],
      ['drag', 'study/study-drag'],
      ['transform 3d', 'study/study-transform-3d'],
    ],
  },
  {
    title: 'Demo',
    name: 'study',
    group: [
      ['小众 HTML 标签', 'study/minority-html'],
      ['滚动绽放', 'study/scroll-bloom'],
      ['整屏滚动', 'study/scroll-snap'],
      ['Svg', 'study/svg'],
      ['Svg Demo', 'study/svg-demo'],
      ['Flow Demo', 'study/flow-demo-grid'],
      ['字体描边', 'study/font-stroke'],
      ['中间省略号 & svg 文本加粗', 'study/demo-text'],
      ['Canvas Base Draw', 'study/canvas'],
      ['Canvas Base Style', 'study/canvas-base-style'],
      ['Select', 'study/select'],
      ['Upload File Preview', 'study/upload-file-preview'],
      ['Test', 'study/test'],
    ],
  },
  {
    title: 'Game',
    name: 'game',
    group: GameRouter.map((item) => [item.title, 'game/' + item.path]),
  },
]
