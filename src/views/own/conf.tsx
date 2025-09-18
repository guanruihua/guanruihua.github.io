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
    group: DevRouter.map((item) => [
      item.title || item.path,
      'dev/' + item.path,
    ]),
  },
  {
    title: 'CSS',
    name: 'demo',
    group: [
      ['双引号样式', 'demo/css-q-quotes'],
      ['flex', 'demo/css-flex'],
      ['grid', 'demo/css-grid'],
      ['drag', 'demo/study-drag'],
      ['transform 3d', 'demo/study-transform-3d'],
    ],
  },
  {
    title: 'Demo',
    name: 'demo',
    group: [
      ['小众 HTML 标签', 'demo/minority-html'],
      ['滚动绽放', 'demo/scroll-bloom'],
      ['整屏滚动', 'demo/scroll-snap'],
      ['Svg', 'demo/svg'],
      ['Svg Demo', 'demo/svg-demo'],
      ['Flow Demo', 'demo/flow-demo-grid'],
      ['字体描边', 'demo/font-stroke'],
      ['中间省略号 & svg 文本加粗', 'demo/demo-text'],
      ['Canvas Base Draw', 'demo/canvas'],
      ['Canvas Base Style', 'demo/canvas-base-style'],
      ['Select', 'demo/select'],
      ['Upload File Preview', 'demo/upload-file-preview'],
      ['Card Beam Animation', 'demo/card-beam-animation'],
      ['Test', 'demo/test'],
    ],
  },
  {
    title: 'Game',
    name: 'game',
    group: GameRouter.map((item) => [item.title, '/game/' + item.path]),
  },
]
