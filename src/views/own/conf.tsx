import { AnimationRouter } from '../animation/router'
import { ChartRouter } from '../chart/router'
import { DemoRouter } from '../demo/router'
import { DevRouter } from '../dev/router'
import { FileRouter } from '../file/router'
import { GameRouter } from '../game/router'
import { GenRouter } from '../gen/router'
import { MutualConversionRouter } from '../mutual-conversion/router'
import { OtherRouter } from '../other/router'
import { ToolRouter } from '../tool/router'

export const __blank = ['dev/tldraw', 'dev/excalidraw']

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
    title: 'Conversion',
    name: 'mutual-conversion',
    group: MutualConversionRouter.map((item: any) => [
      item.title || item.path,
      'mutual-conversion/' + item.path,
    ]),
  },
  {
    title: 'Other',
    name: 'other',
    group: OtherRouter.map((item) => [
      item.title || item.path,
      'other/' + item.path,
    ]),
  },
  {
    title: 'Gen',
    name: 'gen',
    group: GenRouter.map((item) => [
      item.title || item.path,
      'gen/' + item.path,
    ]),
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
    title: 'File',
    name: 'file',
    group: FileRouter.map((item) => [
      item.title || item.path,
      'file/' + item.path,
    ]),
  },
  {
    title: 'Chart',
    name: 'chart',
    group: ChartRouter.map((item: any) => [
      item.title || item.path,
      'chart/' + item.path,
    ]),
  },
  {
    title: 'Animation',
    name: 'animation',
    group: AnimationRouter.map((item: any) => [
      item.title || item.path,
      'animation/' + item.path,
    ]),
  },

  {
    title: 'Demo',
    name: 'demo',
    group: DemoRouter.map((item) => [
      item.title || item.path,
      'demo/' + item.path,
    ]),
  },
  {
    title: 'Game',
    name: 'game',
    group: GameRouter.map((item) => [item.title, '/game/' + item.path]),
  },
]
