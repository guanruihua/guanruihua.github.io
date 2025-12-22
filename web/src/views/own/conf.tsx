import { ObjectType } from '0type'
import Dev from '../dev/router'
import { GameRouter } from '../game/router'
import Animation from '../animation/router'
import Chart from '../chart/router'
import Demo from '../demo/router'
import File from '../file/router'
import Gen from '../gen/router'
import MutualConversion from '../mutual-conversion/router'
import Other from '../other/router'
import Server from '../server/router'
import Tool from '../tool/router'
import Analysis from '../analysis/router'

export const __blank = ['dev/tldraw', 'dev/excalidraw']

export const Conf: {
  title: string
  name: string
  path?: string
  group?: string[][]
  route?: ObjectType[]
}[] = [
  {
    title: 'Own',
    name: 'own',
    group: [
      ['Github', 'https://github.com/guanruihua/'],
      ['Note', 'https://ruihuag-note.github.io/'],
      ['Demo', 'https://ruihuag-demo.github.io/'],
      ['0static', 'https://0static.github.io/'],
      ['Sandbox', 'https://ruihuag-sandbox.github.io/'],
      ['Vue Page', 'https://guanruihua-vue.github.io/'],
    ],
  },
  Dev,
  Tool,
  Analysis,
  Animation,
  Chart,
  Demo,
  File,
  Gen,
  MutualConversion,
  Other,
  Server,
  {
    title: 'Game',
    name: 'game',
    group: GameRouter.map((item) => [item.title, '/game/' + item.path]),
  },
]
