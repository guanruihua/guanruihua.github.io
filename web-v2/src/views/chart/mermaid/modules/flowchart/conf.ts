import { Node } from '../component'

export const md = `flowchart LR
    id`
export const nodes: Node[] = [
  {
    id: 'A',
    label: 'Christmas',
    edges: [
      {
        id: 'A-B',
        start: 'A',
        end: 'B',
        label: 'Get money',
      },
    ],
  },
  {
    id: 'B',
    label: 'Go shopping',
    edges: [
      {
        id: 'B-C',
        start: 'B',
        end: 'C',
      },
    ],
  },
  {
    id: 'C',
    label: 'Let me think',
    edges: [
      {
        id: 'C-D',
        start: 'C',
        end: 'D',
        label: 'One',
      },
      {
        id: 'C-E',
        start: 'C',
        end: 'E',
        label: 'Two',
      },
      {
        id: 'C-F',
        start: 'C',
        end: 'F',
        label: 'Three',
      },
      {
        end: 'E2'
      },
    ],
  },
  {
    id: 'D',
    label: 'Laptop',
  },
  {
    id: 'E',
    label: 'iPhone',
  },
  {
    id: 'E2',
    label: 'iPhone17',
  },
  {
    id: 'F',
    label: 'Card',
    edges: [{ end: 'G' }],
  },
  {
    id: 'G',
    label: 'Others',
  },
]
