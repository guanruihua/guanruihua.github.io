import { ObjectType } from '0type'

export interface Node {
  id: string
  type?:
    | 'node'
    | 'workflow-start'
    | 'agent'
    | 'deepseek'
    | 'database'
    | 'RSS'
    | 'default'
    | string
    | undefined
  dataType?: 'chat-model' | 'memory' | 'tool' | 'agent' | 'default' | string
  label?: string
  nextLabel?: string

  
  x?: number
  y?: number
  row?: number

  edge?: string | ObjectType<string>
  to?: string
  [key: string]: any
}

export interface Edge {
  id: string
  type?: string
  start: string
  end: string
  [key: string]: any
}

export interface Position {
  rect: DOMRect
  top: [number, number]
  right: [number, number]
  bottom: [number, number]
  left: [number, number]
  'chat-model'?: [number, number]
  memory?: [number, number]
  tool?: [number, number]
}

export type DataStatus = 'idle' | 'success' | 'error' | 'warning' | 'default'

export interface PageState {
  nodes?: Node[]
  edges?: Edge[]
  offset?: {
    x: number
    y: number
  }

  rootRect?: DOMRect | ObjectType
  nodeRect?: {
    [key: string]: Position
  }
  status?: {
    [key: string]: DataStatus
  }

  dialog?: {
    open: boolean
    node: Node | ObjectType
    [key: string]: any
  }

  lastUpdate?: number
  [key: string]: any
}
