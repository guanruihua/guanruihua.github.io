import { Node } from './type'

const unit = 32
const rowGap = unit * 4 * 2

export { unit, rowGap }

export const nodes: Node[] = [
  {
    id: '1',
    type: 'node',
    label: 'Input Node',
    row: 0,
    x: 0,
    edge: '2,3',
  },
  // {
  //   id: '1-11',
  //   type: 'node',
  //   label: 'Input Node',
  //   row: 0,
  //   x: 8,
  //   edge: '2,3',
  // },
  {
    id: '2',
    type: 'node',
    label: 'Default Node',
    row: 1,
    x: -5,
    edge: '4',
  },
  {
    id: '3',
    type: 'node',
    label: 'Output Node',
    row: 1,
    x: 5,
  },
  {
    id: '4',
    type: 'node',
    label: ' ',
    row: 2,
    x: -14,
    edge: '5',
  },
  {
    id: '5',
    type: 'node',
    label: 'Resize me',
    x: -6,
    row: 2,
  },
]

const row1: Node[] = [
  {
    id: '3',
    type: 'deepseek',
    dataType: 'chat-model',
  },
  {
    id: '4',
    type: 'database',
    dataType: 'memory',
  },
  {
    id: '5',
    type: 'RSS',
    dataType: 'tool',
  },
  {
    id: '6',
    type: 'RSS',
    dataType: 'tool',
  },
  {
    id: '7',
    type: 'RSS',
    dataType: 'tool',
  },
  {
    id: '8',
    type: 'RSS',
    dataType: 'tool',
  },
  {
    id: '9',
    type: 'RSS',
    dataType: 'tool',
  },
].map((item: any, i: number) => {
  item.row = 1
  item.x = -12 + i * 5
  return item as Node
})

export const workflow: Node[] = [
  // row 0
  {
    id: '1',
    type: 'workflow-start',
    row: 0,
    x: -5,
    edge: '2',
  },
  {
    id: '2',
    type: 'agent',
    dataType: 'agent',
    label: 'AI Agent',
    nextLabel: 'Tools Agent',
    row: 0,
    x: 5,
    edge: {
      'chat-model': '3',
      memory: '4',
      tool: '5,6,7,8,9',
    },
  },
  ...row1,
]
